import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import projectService from "../../services/projectService";
import ReuseElementsInventory from "../reuse-elements-inventory/ReuseElementsInventory";

export default function ProjectDetails({
    user,
}) {

    const navigate = useNavigate();

    const [project, setProject] = useState({});

    const { projectId } = useParams();

    useEffect(() => {
        (async () => {
            const result = await projectService.getOne(projectId);
            setProject(result);
        })();
    }, [projectId])

    const projectDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${project.name}?`);

        if (!hasConfirm) {
            return;
        }

        await projectService.delete(projectId);

        navigate('/projects')
    };

    return (
        <section>
            <div className="content-container">
                <main>
                    <figure className="hero">
                        <img src={project.imageUrl} alt="" />
                        {/* <figcaption>&copy; Image by ...</figcaption> */}
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
                    <section className="buttons">
                        <Link to={`/projects/${projectId}/edit`} className="button">
                            <button
                                className="button"
                            >
                                Edit Project Details
                            </button>
                        </Link>
                        <button
                            onClick={projectDeleteClickHandler}
                            className="button"
                        >
                            Delete Project
                        </button>
                    </section>
                </aside>
            </div>

            <ReuseElementsInventory user={user}/>

        </section>
    )
}