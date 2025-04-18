import { Link } from "react-router"
import useAuth from "../../hooks/useAuth"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import BasketContext from "../../contexts/BasketContext";

export default function Header() {
    const { email, isAuthenticated } = useAuth();
    const { _id: userId } = useContext(UserContext);
    const { basketElements } = useContext(BasketContext);
    const [itemCount, setItemCount] = useState(basketElements.length);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        if (basketElements.length !== itemCount) {
            setItemCount(basketElements.length);
            setHasChanged(true);
            setTimeout(() => setHasChanged(false), 1000);
        }
    }, [basketElements, itemCount]);

    return (
        <header className="site-header">
            <h1>
                <Link to="/">kh ReUse</Link>
            </h1>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/projects">Projekte</Link>
                    </li>
                    <li>
                        <Link to="/elements">Bauelemente</Link>
                    </li>
                    {isAuthenticated ?
                        (
                            <div id="user">
                                <li>
                                    <Link to={`/baskets/${userId}`} className={`basket-indicator ${hasChanged ? 'updated' : ''}`}>Warenkorb ({itemCount}) </Link>
                                </li>
                                <li>
                                    <Link to="/logout">Abmelden </Link>
                                    {email}
                                </li>
                            </div>
                        )
                        :
                        (
                            <div id="guest">
                                <li>
                                    <Link to="/login">Anmelden</Link>
                                </li>
                                <li>
                                    <Link to="/register">Registrieren</Link>
                                </li>
                            </div>
                        )
                    }
                    {/* <li>
                        <Link to="/about">About</Link>
                    </li> */}

                    <div class="hamburger" onclick="document.querySelector('.navigation').classList.toggle('open')">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                </ul>
            </nav>
        </header>
    )
}