import { useGetAllInBasket } from "../../api/basketApi"
import idSlicer from "../../utils/idSlicer";

export default function Basket() {

    const { elements } = useGetAllInBasket();

    if(elements?.length > 0){
        console.log(elements);
    }

    return (
        <div className="main-content"> 
        <div className="elements-table">
            <h1>You have {elements.length} elements in your basket: </h1>
            <table >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tragend</th>
                        <th>Material</th>
                        <th>Funktion</th>
                        {/* <th>Menge</th> */}
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
                        elements.map(item => (
                            <tr key={item._id} >
                                <td>#{idSlicer(item._id)}</td>
                                <td>{item.element.element.loadBearing}</td>
                                <td>{item.element.element.material}</td>
                                <td>{item.element.element.function}</td>
                                {/* <td>{item.element.element.quantity}</td> */}
                                <td>{item.element.element.specification}</td>
                                <td>{item.element.element.quality}</td>
                                <td>{item.element.element.length}</td>
                                <td>{item.element.element.profileType}</td>
                                <td>{item.element.element.condition}</td>
                                <td>{item.element.element.connectionType}</td>
                                <td>{item.element.element.manufacturingYear}</td>
                                <td>{item.element.element.comment}</td>
                                <td><button className="delete-button">Delete</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
}