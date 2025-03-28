import { Link } from "react-router"

export default function Details() {
    return (
        <header className="site-header">
            <h1>
                <Link to="/">knippershelbig ReUse </Link>
            </h1>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/projects">ReUse Projects</Link>
                    </li>
                    <li>
                        <Link to="/projects/add">Add Project</Link>
                    </li>
                    <li>
                        <Link to="/projects/edit">Edit Project</Link>
                    </li>
                    <li>
                        <Link to="/materials">Harvest Materials</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}