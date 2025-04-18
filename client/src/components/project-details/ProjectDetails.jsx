import { Link, useNavigate, useParams } from "react-router";
import ReuseElementsInventory from "../reuse-elements-inventory/ReuseElementsInventory";
import { useDeleteProject, useGetOneProject } from "../../api/projectsApi";
import useAuth from "../../hooks/useAuth";
import { useAddElement, useGetElements } from "../../api/elementsApi";
import { useOptimistic } from "react";
import { v4 as uuid } from 'uuid'
import ExcelToJson from "../reuse-elements-inventory/ExcelUpload";

export default function ProjectDetails() {
    const navigate = useNavigate();
    const { email, userId } = useAuth();
    const { projectId } = useParams();
    const { project } = useGetOneProject(projectId);
    const { remove } = useDeleteProject();
    const { add } = useAddElement();
    const { elements, addElement } = useGetElements({ projectId });
    const [optimisticElements, setOptimisticElements] = useOptimistic(elements, (state, newElement) => [...state, newElement]);

    const projectDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${project.name}?`);

        if (!hasConfirm) {
            return;
        }

        try {
            await remove(projectId);
            navigate('/projects', { state: { projectDeleted: true, deletedId: projectId } });
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const elementsAddHandler = async (data) => {

        const element = Object.fromEntries(data);
        console.log();


        const newOptimisticElement = {
            _id: uuid(),
            _ownerId: userId,
            projectId,
            material: element.material,
            elementType: element.elementType,
            profileType: element.profileType,
            profile: element.profile,
            condition: element.condition,
            quality: element.quality,
            specification: element.specification,
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
        const newElementServer = await add(
            projectId,
            element.material,
            element.elementType,
            element.profileType,
            element.profile,
            element.condition,
            element.quality,
            element.specification,
            element);

        console.log(newElementServer);

        // ACTUAL UPDATE
        addElement({ ...newElementServer, author: { email } });
    }

    // const elementsAddFromExcel = (data) => {
    //     console.log(data);

    // }

    //TODO Check if this is working properly.
    const isOwner = userId === project._ownerId;

    return (
        <section className="main-content">
            <div className="content-container">
                <main>
                    <section className="project-headline">
                        <h2>{project.name}</h2>
                        <h3>{project.location}</h3>
                    </section>
                </main>
                <aside>
                    <div className="project-info">
                        <figure className="hero">
                            <img src={project.imageUrl} alt="" />
                        </figure>
                        <section className="description">
                            <section className="project-details">
                                <section>
                                    <h5 className="project-details-side">Baujahr:
                                        <p className="project-details-side">{project.construction}</p>
                                    </h5>
                                    <h5 className="project-details-side">Abrissdatum:
                                        <p className="project-details-side">{project.demolition}</p>
                                    </h5>
                                    <h5 className="project-details-side">Nutzung:
                                        <p className="project-details-side">{project.purpose}</p>
                                    </h5>
                                    <h5 className="project-details-side">Bauweise:
                                        <p className="project-details-side">{project.constructionType}</p>
                                    </h5>
                                    <h5 className="project-details-side">BGF (m²):
                                        <p className="project-details-side">{project.bgf}</p>
                                    </h5>
                                    <h5 className="project-details-side">NUF (m²):
                                        <p className="project-details-side">{project.nuf}</p>
                                    </h5>
                                </section>
                                <section>
                                    <h5 className="project-details-side">Bauherr:
                                        <p className="project-details-side">{project.client}</p>
                                    </h5>
                                    <h5 className="project-details-side">Ausführungspläne:
                                        <p className="project-details-side">{project.shopDrawings}</p>
                                    </h5>
                                    <h5 className="project-details-side">Statik:
                                        <p className="project-details-side">{project.structuralCalcs}</p>
                                    </h5>
                                    <h5 className="project-details-side">Objektplanung:
                                        <p className="project-details-side">{project.projectPlanning}</p>
                                    </h5>
                                    <h5 className="project-details-side">Tragwerksplanung:
                                        <p className="project-details-side">{project.structuralPlaning}</p>
                                    </h5>
                                    <h5 className="project-details-side">Fassadenplanung:
                                        <p className="project-details-side">{project.facadePlanning}</p>
                                    </h5>
                                </section>
                            </section>
                            <section className="project-details-buttons">
                                <p>{project.descriptionConstruction}</p>
                                {isOwner &&
                                    <section className="buttons">
                                        <Link to={`/projects/${projectId}/edit`} className="button">
                                            <button
                                                className="button">
                                                {/* Edit Project */}
                                                Projekt bearbeiten
                                            </button>
                                        </Link>
                                        <button
                                            onClick={projectDeleteClickHandler}
                                            className="button">
                                            {/* Delete Project */}
                                            Projekt löschen
                                        </button>
                                    </section>}
                            </section>
                        </section>
                    </div>
                </aside>
            </div>

            <ReuseElementsInventory user={email} projectId={projectId} elements={optimisticElements} onAddElement={elementsAddHandler} />

            {/* {email  &&
            <ExcelToJson onAddElement={elementsAddFromExcel}/>
            } */}

        </section>
    )
}