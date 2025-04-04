import { Link, useNavigate, useParams } from "react-router";
import ReuseElementsInventory from "../reuse-elements-inventory/ReuseElementsInventory";
import { useDeleteGame, useGetOneProject } from "../../api/projectsApi";
import useAuth from "../../hooks/useAuth";
import { useAddElement, useGetAllElements } from "../../api/elementsApi";
import { useOptimistic } from "react";
import { v4 as uuid } from 'uuid'

export default function ProjectDetails() {
    const navigate = useNavigate();
    const { email, userId } = useAuth();
    const { projectId } = useParams();
    const { project } = useGetOneProject(projectId);
    const { remove } = useDeleteGame();
    const { add } = useAddElement();
    const { elements, addElement } = useGetAllElements(projectId);
    const [ optimisticElements, setOptimisticElements ] = useOptimistic(elements, (state, newElement) => [...state, newElement]);

    const projectDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${project.name}?`);

        if (!hasConfirm) {
            return;
        }

        await remove(projectId);
        navigate('/projects')
    };


    const elementsAddHandler = async (formData) => {

        const element = Object.fromEntries(formData);
      
        const newOptimisticElement = {
            _id: uuid(),
            _ownerId: userId,
            projectId,
            material: element.material,
            element,
            pending: true,
            author: {
                email,
            }
        };
        
        // OPTIMISTIC UPDATE
        setOptimisticElements(newOptimisticElement);


        // SERVER UPDATE
        //TODO add try/catch
        const newElementServer = await add(projectId, element.material, element);

        // ACTUAL UPDATE
        addElement({...newElementServer, author: { email }});
    }

    //TODO Check if this is working properly.
    const isOwner = userId === project._ownerId;

    return (
        <section>
            <div className="content-container">
                <main>
                    <figure className="hero">
                        <img src={project.imageUrl} alt="" />
                    </figure>
                </main>
                <aside>
                    <section className="description">
                        <h2>{project.name}</h2>
                        <h3>{project.location}</h3>
                        <h5>built: {project.construction}</h5>
                        <h5>demolished: {project.demolition}</h5>
                        <p>{project.description}</p>
                    </section>

                    {isOwner &&
                        <section className="buttons">
                            <Link to={`/projects/${projectId}/edit`} className="button">
                                <button
                                    className="button">
                                    Edit Project Details
                                </button>
                            </Link>
                            <button
                                onClick={projectDeleteClickHandler}
                                className="button">
                                Delete Project
                            </button>
                        </section>
                     }
                </aside>
            </div>

            <ReuseElementsInventory user={email} projectId={projectId} elements={optimisticElements} onAddElement={elementsAddHandler} />

        </section>
    )
}