import { useElements } from "../../../api/elementsApi";
import idSlicer from "../../../utils/idSlicer";

export default function SearchItems({
    selected,
}) {
    //TODO add a spinner
    const { elements } = useElements({ filterParam: "profileType", filterValue: selected });

    const getElementIdHandler = (id) => {
        console.log(id);
    }
  
    return (
        <div className="elements-table">
            <h3>Results</h3>
            <table >
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
                        elements.map(item => (
                            <tr key={item._id} >
                                <td>#{idSlicer(item._id)}</td>
                                <td>{item.element.loadBearing}</td>
                                <td>{item.element.material}</td>
                                <td>{item.element.function}</td>
                                <td>{item.element.quantity}</td>
                                <td>{item.element.specification}</td>
                                <td >{item.element.quality}</td>
                                <td>{item.element.length}</td>
                                <td className="table-highlight">{item.element.profileType}</td>
                                <td>{item.element.condition}</td>
                                <td>{item.element.connectionType}</td>
                                <td>{item.element.manufacturingYear}</td>
                                <td>{item.element.comment}</td>
                                <td><button onClick={() => getElementIdHandler(item._id)} className="grab-button">Grab!</button></td>
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
    )
}