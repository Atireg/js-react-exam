import { useEffect, useState } from "react";
import { useParams } from "react-router";
import projectService from "../../services/projectService";

export default function ProjectDetails() {

    const [project, setProject] = useState({});

    const { projectId } = useParams();

    console.log(projectId);


    useEffect(() => {
        (async () => {
            const result = await projectService.getOne(projectId);
            setProject(result);
        })();
    }, [projectId])

    console.log(project);


    return (
        <div className="content-container">
            <main>
                <figure className="hero">
                    <img src={project.imageUrl} alt="" />
                    {/* <figcaption>&copy; Image by ...</figcaption> */}
                </figure>

            </main>

            <aside>
                {/* <section className="threeDcontent">
                    <h2>3D content here</h2>
                </section> */}
                <section className="description">
                    <h2>{project.name}</h2>
                    <h3>{project.location}</h3>
                    <h5>built: {project.construction}</h5>
                    <h5>demolished: {project.demolition}</h5>
                    <p>{project.description}</p>
                </section>
            </aside>
        </div>
    )
}