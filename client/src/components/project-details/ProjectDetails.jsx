import { Link, useNavigate, useParams } from "react-router";
import ReuseElementsInventory from "../reuse-elements-inventory/ReuseElementsInventory";
import { useDeleteGame, useGetOneProject } from "../../api/projectsApi";
import useAuth from "../../hooks/useAuth";
// import { useGetAllElements } from "../../api/elementsApi";

export default function ProjectDetails() {
    const navigate = useNavigate();
    // const { email, _id: userId } = useAuth();
    const { email } = useAuth();

    // console.log(email);
    

    const { projectId } = useParams();
    
    const { project } = useGetOneProject(projectId);
    const { remove } = useDeleteGame();
    // const { elements } = useGetAllElements(projectId);

    const projectDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${project.name}?`);

        if (!hasConfirm) {
            return;
        }

        await remove(projectId);
        navigate('/projects')
    };

    // const elementsAddHandler = (newElement) => {
    //     // setElements(state => [...state, newElement])
    // }

    //TODO Check if this is working properly.
    // const isOwner = userId === project._ownerId;

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

                    {/* {isOwner && */}
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
                    {/* } */}
                </aside>
            </div>

            {/* <ReuseElementsInventory user={email} projectId={projectId} elements={elements} onAddElement={elementsAddHandler} /> */}

        </section>
    )
}