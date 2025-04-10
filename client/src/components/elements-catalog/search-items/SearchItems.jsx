import { useGetElements } from "../../../api/elementsApi";
import idSlicer from "../../../utils/idSlicer";
import { Link } from "react-router";
import useAddToBasketHandler from "../../../hooks/useAddToBasketHandler";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import BasketContext from "../../../contexts/BasketContext";
import useAuth from "../../../hooks/useAuth";

export default function SearchItems({
    selected,
}) {
    const { isAuthenticated } = useAuth();
    const { elements } = useGetElements({ filterParam: "profileType", filterValue: selected });
    const { _id: userId } = useContext(UserContext);
    const { basketId, basketElements, updateBasketElements } = useContext(BasketContext);
    const { addToBasketHandler, isLoading } = useAddToBasketHandler(basketId, updateBasketElements);

    return (
        <div className="elements-table">
            <h3>Results</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tragend</th>
                        <th>Material</th>
                        <th>Funktion</th>
                        <th>Menge</th>
                        <th>Werkstoff</th>
                        <th>Materialgüte</th>
                        <th>Länge (m)</th>
                        <th>Profil</th>
                        <th>Zustand</th>
                        <th>Verbindung</th>
                        <th>Baujahr</th>
                        <th>Kommentar</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {elements?.length > 0 ? (
                        elements.map(item => {
                            const isAlreadyInBasket = basketElements?.some(
                                (el) => el._id === item._id
                            );

                            return (
                                <tr key={item._id}>
                                    <td>#{idSlicer(item._id)}</td>
                                    <td>{item.element.loadBearing}</td>
                                    <td>{item.element.material}</td>
                                    <td>{item.element.function}</td>
                                    <td>{item.element.quantity}</td>
                                    <td>{item.element.specification}</td>
                                    <td>{item.element.quality}</td>
                                    <td>{item.element.length}</td>
                                    <td className="table-highlight">{item.element.profileType}</td>
                                    <td>{item.element.condition}</td>
                                    <td>{item.element.connectionType}</td>
                                    <td>{item.element.manufacturingYear}</td>
                                    <td>{item.element.comment}</td>
                                    <td>
                                        {isAuthenticated ? (
                                            <button
                                                onClick={() => addToBasketHandler(item)}
                                                className="small-button"
                                                style={{
                                                    backgroundColor: isAlreadyInBasket || isLoading(item._id) ? 'grey' : '#e98166cb',
                                                    color: 'white',
                                                    cursor: isAlreadyInBasket || isLoading(item._id) ? 'not-allowed' : 'pointer',
                                                    opacity: isAlreadyInBasket || isLoading(item._id) ? 0.7 : 1
                                                }}
                                                disabled={isAlreadyInBasket || isLoading(item._id)}
                                            >
                                                {isAlreadyInBasket
                                                    ? 'Already Grabbed'
                                                    : isLoading(item._id)
                                                    ? 'Adding...'
                                                    : 'Grab!'}
                                            </button>
                                        ) : (
                                            <Link to='/login'>
                                                <button className="small-button">
                                                    Login to Grab!
                                                </button>
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="14">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Link to={`/baskets/${userId}`}>
                <button>
                    Go to Your Basket!
                </button>
            </Link>
        </div>
    );
}
