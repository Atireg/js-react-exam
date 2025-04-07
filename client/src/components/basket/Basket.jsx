import { useEffect, useState } from "react";
import { useDeleteFromBasket, useGetAllInBasket } from "../../api/basketApi"
import idSlicer from "../../utils/idSlicer";
import { Link } from "react-router";

export default function Basket() {
    const { elements } = useGetAllInBasket();
    const { deleteFromBasket } = useDeleteFromBasket();
    const [elementsInBasket, setElementsInBasket] = useState([]);

    if (elements?.length > 0) {
        console.log(elements);
    }

    useEffect(() => {
        setElementsInBasket(elements)
    }, [elements])

    const onDeleteHandler = async (elementId) => {
        const hasConfirm = confirm(`Are you sure you want to delete Element #${elementId}?`);

        if (!hasConfirm) {
            return;
        }
        await deleteFromBasket(elementId)
        setElementsInBasket(prev => prev.filter(item => item._id !== elementId));
    }

    console.log(elementsInBasket);

    return (
        <div className="main-content">
            <div className="elements-table">
                <h2>You have {elementsInBasket.length} elements in your basket: </h2>
                <table >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tragend</th>
                            <th>Material</th>
                            <th>Funktion</th>
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
                        {elementsInBasket?.length > 0 ? (
                            elementsInBasket.map(item => (
                                <tr key={item._id} >
                                    <td>#{idSlicer(item._id)}</td>
                                    <td>{item.element.element.loadBearing}</td>
                                    <td>{item.element.element.material}</td>
                                    <td>{item.element.element.function}</td>

                                    <td>{item.element.element.specification}</td>
                                    <td>{item.element.element.quality}</td>
                                    <td>{item.element.element.length}</td>
                                    <td>{item.element.element.profileType}</td>
                                    <td>{item.element.element.condition}</td>
                                    <td>{item.element.element.connectionType}</td>
                                    <td>{item.element.element.manufacturingYear}</td>
                                    <td>{item.element.element.comment}</td>
                                    <td><button onClick={() => onDeleteHandler(item._id)} className="small-button">Delete</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {elementsInBasket?.length == 0 && (
                    <Link to="/elements">
                        <p>Go grab some elements!</p>
                    </Link>
                )}
            </div>
        </div>
    )
}