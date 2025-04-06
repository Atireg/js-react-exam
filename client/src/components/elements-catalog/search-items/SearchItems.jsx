import { useElements } from "../../../api/elementsApi";
import idSlicer from "../../../utils/idSlicer";

export default function SearchItems({
    selected,
}) {

    //TODO add optimistic state ?
    const { elements } = useElements({ filterParam: "profileType", filterValue: selected });

    console.log(elements);

    return (
        <div className="search-tems">
            <h2>Your search items are:</h2>
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
                        <th>Hinzugefügt von</th>
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
                                <td>{item.element.quality}</td>
                                <td>{item.element.length}</td>
                                <td>{item.element.profileType}</td>
                                <td>{item.element.condition}</td>
                                <td>{item.element.connectionType}</td>
                                <td>{item.element.manufacturingYear}</td>
                                <td>{item.element.comment}</td>
                                <td>{item.author.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}