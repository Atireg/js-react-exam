import { useEffect, useState } from "react";
import { useAddBasket, useDeleteFromBasket, useGetAllBaskets, useGetAllInBasket } from "../../api/basketApi"
import idSlicer from "../../utils/idSlicer";
import { Link } from "react-router";
import { v4 as uuid } from 'uuid'
import useAuth from "../../hooks/useAuth";

export default function Basket() {
    const { user } = useAuth();
    const { elements } = useGetAllInBasket();
    const { deleteFromBasket } = useDeleteFromBasket();
    const [ elementsInBasket, setElementsInBasket ] = useState([]);
    const { addBasket } = useAddBasket();
    const { baskets } = useGetAllBaskets();

    const [ userBasket, setUserBasket ] = useState(null);

    
  useEffect(() => {
    if (!user || !baskets || userBasket) return;

    // Check if user already has a basket
    const existing = baskets.find(basket => basket._ownerId === user._id);

    if (existing) {
      setUserBasket(existing);
    } else {
      const createBasket = async () => {
        const res = await addBasket(); 
      };
      createBasket();
    }
  }, [user, baskets]);
    

   
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