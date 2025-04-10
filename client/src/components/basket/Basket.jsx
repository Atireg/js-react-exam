import { useEffect, useState } from "react";
import { useGetAllInBasket } from "../../api/basketApi"
import idSlicer from "../../utils/idSlicer";
import { Link } from "react-router";
import { useUserBasket } from "../../hooks/useUserBasket";

export default function Basket() {
    const { userBasket } = useUserBasket();
    const { elements } = useGetAllInBasket(userBasket?._id);
    // const { deleteFromBasket } = useDeleteFromBasket(userBasket?._id);
    const [elementsInBasket, setElementsInBasket] = useState([]);
 
    useEffect(() => {
        if (elements) {
            setElementsInBasket(elements); 
        }
    }, [elements])

    // const onDeleteHandler = async (elementId) => {
    //     const hasConfirm = confirm(`Are you sure you want to delete Element #${elementId}?`);

    //     if (!hasConfirm) {
    //         return;
    //     }
    //     try {
    //         await deleteFromBasket(elementId);
    //         setElementsInBasket(prev => prev.filter(item => item._id !== elementId));
    //     } catch (err) {
    //         console.error("Error deleting from basket:", err);
    //     }
    // }

    if (!userBasket || elementsInBasket.length === 0) {
        return <p>Loading your basket...</p>;
    }

    const elementsToDisplay = elementsInBasket.elements

    console.log(elementsToDisplay);
    

    return (
        <div className="main-content">
            <div className="elements-table">
                <h2>You have {elementsToDisplay.length} elements in your basket: </h2>
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
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {elementsToDisplay?.length > 0 ? (
                            elementsToDisplay.map(item => (
                                <tr key={item._id} >
                                    <td>#{idSlicer(item._id)}</td>
                                    <td>{item.element.loadBearing}</td>
                                    <td>{item.element.material}</td>
                                    <td>{item.element.function}</td>

                                    <td>{item.element.specification}</td>
                                    <td>{item.element.quality}</td>
                                    <td>{item.element.length}</td>
                                    <td>{item.element.profileType}</td>
                                    <td>{item.element.condition}</td>
                                    <td>{item.element.connectionType}</td>
                                    <td>{item.element.manufacturingYear}</td>
                                    <td>{item.element.comment}</td>
                                    {/* <td><button onClick={() => onDeleteHandler(userBasket._id, item._id)} className="small-button">Delete</button></td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {elementsToDisplay?.length == 0 && (
                    <Link to="/elements">
                        <p>Go grab some elements!</p>
                    </Link>
                )}
            </div>
        </div>
    )
}