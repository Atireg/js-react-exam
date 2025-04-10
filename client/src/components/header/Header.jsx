import { Link } from "react-router"
import useAuth from "../../hooks/useAuth"
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import BasketContext from "../../contexts/BasketContext";

export default function Header() {
    const { email, isAuthenticated } = useAuth();
    const { _id: userId } = useContext(UserContext);
    const { basketElements } = useContext(BasketContext);

    const itemCount = basketElements?.length || 0;
    
    return (
        <header className="site-header">
            <h1>
                <Link to="/">kh ReUse </Link>
            </h1>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/projects">ReUse Projects</Link>
                    </li>
                    <li>
                        <Link to="/elements">ReUse Elements </Link>
                    </li>
                    {isAuthenticated ?
                        (
                            <div id="user">
                                <li>
                                    <Link to={`/baskets/${userId}`}>My ReUse Basket ({itemCount}) </Link>
                                </li>
                                <li>
                                    <Link to="/logout">Logout </Link>
                                    {email}
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
                    {/* <li>
                        <Link to="/about">About</Link>
                    </li> */}
                </ul>
            </nav>
        </header>
    )
}