import { useContext, useEffect} from "react";
import ProjectsCatalogItem from "./project-catalog-item/ProjectsCatalogItem";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useGetAllProjects } from "../../api/projectsApi";

export default function ProjectsCatalog() {
    const { email } = useContext(UserContext);
    const { projects, fetchProjects } = useGetAllProjects();

    useEffect(() => {
        if (location.state?.projectDeleted) {
            fetchProjects();
        }
    }, [location.state, fetchProjects]);

    return (
        <div className="centered-container">
            <main>
                <section>
                    {/* <h2>We have collected building elements from the following projects: </h2> */}
                    <h2>Wir haben Bauelemente aus folgenden Projekten gesammelt: </h2>
                </section>

                <ul className="gallery">
                    {projects.map(project => <ProjectsCatalogItem key={project._id} {...project} />)}
                </ul>

                {projects.length === 0 && <h2 className="no-items">No projects yet</h2>}

                {email &&
                <Link to={'/projects/add'} className="button">
                    <button
                        className="button"
                    >
                        {/* Add new project */}
                        Neues Projekt anlegen
                    </button>
                </Link>}
            </main>
        </div>
    )
}