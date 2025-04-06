import { Link } from "react-router";
import * as XLSX from "xlsx"
import idSlicer from "../../utils/idSlicer";

export default function ReuseElementsInventory({
    user,
    elements,
    onAddElement
}) {

    // const handleFileUpload = (event) => {
    //     const file = event.target.files[0];

    //     if (file) {
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             const data = new Uint8Array(e.target.result);
    //             const workbook = XLSX.read(data, { type: "array" });

    //             const sheetName = workbook.SheetNames[0]; // Get first sheet
    //             const sheet = workbook.Sheets[sheetName];

    //             let jsonOutput = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Read as an array of rows

    //             // Extract column headers (first row)
    //             const headers = jsonOutput[0];

    //             // Convert rows into JSON objects
    //             const formattedData = jsonOutput.slice(1).map((row) => {
    //                 let rowObject = { _id: crypto.randomUUID() }; // Unique ID for each row
    //                 headers.forEach((header, index) => {
    //                     rowObject[header] = row[index] || ""; // Assign values, handling empty cells
    //                 });
    //                 return rowObject;
    //             });

    //             setJsonData(formattedData);
    //         };

    //         reader.readAsArrayBuffer(file);
    //     }
    // };

    return (
        <section className="reuse-elements-inventory">
            <section>
                <h2>Harvested Building Elements</h2>
            </section>

            <div className="inventory-table-container">
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
                                <tr key={item._id} className="element" style={{ color: item.pending ? 'lightgray' : '' }}>
                                    <td>#{idSlicer(item._id)}</td>
                                    <td>{item.element.loadBearing ? 'Ja' : 'Nein'}</td>
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

            {user
                ?
                <div>
                    <h2>Add a new element</h2>
                    <form action={onAddElement}>
                        <div className="input-group">
                            <label htmlFor="loadBearing">Tragend</label>
                            <select id="loadBearing" name="loadBearing" required>
                                <option value="">Bitte wählen</option>
                                <option value="Ja">Ja</option>
                                <option value="Nein">Nein</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="material">Material</label>
                            <select id="material" name="material" required>
                                <option value="">Bitte wählen</option>
                                <option value="Holz">Holz</option>
                                <option value="Stahl">Stahl</option>
                                <option value="Stahlbeton">Stahlbeton</option>
                                <option value="Glas">Glas</option>
                                <option value="Anderes">Anderes</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="function">Funktion</label>
                            <select id="function" name="function" required>
                                <option value="">Bitte wählen</option>
                                <option value="Stütze">Stütze</option>
                                <option value="Träger">Träger</option>
                                <option value="X">Keine Angabe</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="quantity">Menge</label>
                            <input type="number" id="quantity" name="quantity" min="1" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="specification">Werkstoff</label>
                            <select id="specification" name="specification" required>
                                <option value="">Bitte wählen</option>
                                <option value="Fertigteil">Fertigteil</option>
                                <option value="Halbfertigteil">Halbfertigteil</option>
                                <option value="KVH">KVH</option>
                                <option value="BSH">BSH</option>
                                <option value="BSP">BSP</option>
                                <option value="X">Keine Angabe</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="quality">Materialgüte</label>
                            <select id="quality" name="quality" required>
                                <option value="">Bitte wählen</option>
                                <option value="C24">C24</option>
                                <option value="GL24h">GL24h</option>
                                <option value="C16">C16</option>
                                <option value="S235">S235</option>
                                <option value="S335">S335</option>
                                <option value="X">Keine Angabe</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="length">Länge (m)</label>
                            <input type="number" id="length" name="length" step="0.5" min="0.5" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="profileType">Profil</label>
                            <select id="profileType" name="profileType" required>
                                <option value="">Bitte wählen</option>
                                <option value="IPE100">IPE100</option>
                                <option value="Rundprofil">Rundprofil</option>
                                <option value="Rechteckprofil">Rechteckprofil</option>
                                <option value="Walzprofil">Walzprofil</option>
                                <option value="X">Keine Angabe</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="condition">Zustand</label>
                            <select id="condition" name="condition" required>
                                <option value="">Bitte wählen</option>
                                <option value="Ausreichend">Ausreichend</option>
                                <option value="Gut">Gut</option>
                                <option value="Sehr Gut">Sehr Gut</option>
                                <option value="X">Keine Angabe</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="connectionType">Verbindung</label>
                            <select id="connectionType" name="connectionType" required>
                                <option value="">Bitte wählen</option>
                                <option value="Geschweißt">Geschweißt</option>
                                <option value="Geschraubt ">Geschraubt </option>
                                <option value="GeGossen">Gegossen</option>
                                <option value="Eingehängt">Eingehängt</option>
                                <option value="Vernagelt">Vernagelt</option>
                                <option value="Verkeilt">Verkeilt</option>
                                <option value="X">Keine Angabe</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="manufacturingYear">Baujahr</label>
                            <input type="number" id="manufacturingYear" min="1920" name="manufacturingYear" />
                        </div>


                        <div className="input-group">
                            <label htmlFor="comment">Kommentar</label>
                            <textarea id="comment" name="comment" />
                        </div>

                        <button className="button" type="submit">Add Component</button>
                    </form>
                </div>
                :
                <Link to="/login">
                    <p>Login to add elements.</p>
                </Link>
            }

        </section>
    )
}