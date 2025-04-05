import { useContext} from "react";
import ProjectsCatalogItem from "./project-catalog-item/ProjectsCatalogItem";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useGetAllProjects } from "../../api/projectsApi";

export default function ProjectsCatalog() {
    const { email } = useContext(UserContext);
    const { projects } = useGetAllProjects();

    return (
        <div className="centered-container">
            <main>
                <section>
                    <h2>We have collected building elements from the following projects: </h2>
                </section>

                <ul className="gallery">
                    {projects.map(project => <ProjectsCatalogItem key={project._id} {...project} />)}
                </ul>

                {projects.length === 0 && <h2 className="no-items">No projects yet</h2>}

                {/* TODO Only if logged */}

                {email &&
                <Link to={'/projects/add'} className="button">
                    <button
                        // onClick={}
                        className="button"
                    >
                        Add new project
                    </button>
                </Link>}
            </main>
        </div>
    )
}