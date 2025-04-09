import { useState } from "react";
import { useGetElements } from "../../../api/elementsApi";
import idSlicer from "../../../utils/idSlicer";
import { useAddToBasket } from "../../../api/basketApi";
import { Link } from "react-router";

export default function SearchItems({ selected }) {
    const { elements } = useGetElements({ filterParam: "profileType", filterValue: selected });
    const { addToBasket } = useAddToBasket();
    
    // Track loading state per item (by ID)
    const [loadingIds, setLoadingIds] = useState({});

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const addToBasketHandler = async (searchId) => {
        const foundElement = elements.find(item => item._id === searchId);
        if (!foundElement) return;

        setLoadingIds(prev => ({ ...prev, [searchId]: true }));

        try {
            await addToBasket(foundElement);
            await sleep(500); 
        } finally {
            setLoadingIds(prev => ({ ...prev, [searchId]: false }));
        }
    };

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
                            const isLoading = loadingIds[item._id];

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
                                        <button
                                            onClick={() => addToBasketHandler(item._id)}
                                            className="small-button"
                                            style={{
                                                backgroundColor: isLoading ? 'grey' : '#007bff',
                                                color: 'white',
                                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                                opacity: isLoading ? 0.7 : 1
                                            }}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Adding...' : 'Grab One!'}
                                        </button>
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

            <Link to="/basket">
                <p>Go to Your Basket!</p>
            </Link>
        </div>
    );
}
