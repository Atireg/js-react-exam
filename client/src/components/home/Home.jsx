import { Link } from "react-router";
import { useLatestProjects } from "../../api/projectsApi"

export default function Home() {
    const { latestProjects } = useLatestProjects();

    return (
        <div className="centered-container">
            <h1>Welcome to knippershelbig ReUse!</h1>
            <section>
                <h2>We're thrilled to introduce our sustainability project, where we explore the potential of harvesting materials from demolished buildings and repurposing them to create new, innovative structures.</h2>
            </section>
            <h2>Our latest projects are:</h2>

            {latestProjects.map(project => (
                <section key={project._id} className="latestProjects">
                    <p>{project.name} ({project.construction} - {project.demolition})</p>
                    <Link to={`/projects/${project._id}/details`}>
                        <button className="button">Details</button>
                    </Link>
                </section>
            ))}

            {latestProjects.length === 0 &&
                <p>No projects yet</p>
            }

            {/* //TODO Add more jsx + styles for latestProjects */}
        </div>
    )
}