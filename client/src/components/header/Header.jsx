import { Link } from "react-router"
import useAuth from "../../hooks/useAuth"

export default function Header() {
    const { authData, isAuthenticated } = useAuth();

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
                        <Link to="/materials">Harvest Materials</Link>
                    </li>
                    {isAuthenticated ?
                        (
                            <div id="user">
                                <li>
                                    <Link to="/logout">Logout { authData.email }</Link>
                                </li>
                            </div>
                        )
                        :
                        (
                            <div id="guest">
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </div>
                        )
                    }
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}