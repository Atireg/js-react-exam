import { Link } from "react-router";
import { useLatestProjects } from "../../api/projectsApi"

export default function Home() {
    const { latestProjects } = useLatestProjects();

    return (
        <div className="centered-container">
            <h1>Willkommen bei kh ReUse!</h1>
            {/* <h1>Welcome to kh ReUse!</h1> */}
            <section className="welcome-msg">
                <h2>Wir freuen uns sehr, unser Nachhaltigkeitsprojekt vorzustellen, in dem wir das Potenzial erkunden, Materialien aus abgerissenen Gebäuden zu gewinnen und sie für neue, innovative Bauwerke wiederzuverwenden.</h2>
                {/* <h2>We're thrilled to introduce our sustainability project, where we explore the potential of harvesting materials from demolished buildings and repurposing them to create new, innovative structures.</h2> */}
            </section>
            <h3>Unsere neuesten Projekte sind:</h3>
            {/* <h3>Our latest projects are:</h3> */}

            <ul className="gallery">

                {latestProjects.map(project => (
                    <section key={project._id} className="latestProjects">
                        <p>{project.name}</p>
                        <Link to={`/projects/${project._id}/details`}>
                            <button className="small-button">Details</button>
                        </Link>
                    </section>
                ))}
            </ul>

            {latestProjects.length === 0 &&
                <p>No projects yet</p>
            }

        </div>
    )
}