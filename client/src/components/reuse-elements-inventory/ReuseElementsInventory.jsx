import { Link } from "react-router";
import * as XLSX from "xlsx"
// import styles from './ReuseElementsInventory.module.css'
// import { useState } from "react";

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

            {/* <section className="structural-timber">
                <h3>Structural Timber:</h3>
            </section>

            <section className="structural-steel">
                <h3>Structural Steel: </h3> */}
                
                {/* //TODO take this out and solve with Context */}
                <div className="inventory-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Element Type</th>
                                <th>Profile</th>
                                <th>Count</th>
                                <th>Length Axis</th>
                                <th>Location</th>
                                <th>Comment</th>
                                <th>Added by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elements.length > 0
                                ?
                                elements.map(element => (
                                    <tr key={element._id} className="element" style={{color: element.pending ? 'lightgray' : ''}}>
                                        <td>{element.element.material}</td>
                                        <td>{element.element.elementType}</td>
                                        <td>{element.element.profile}</td>
                                        <td>{element.element.count}</td>
                                        <td>{element.element.lengthAxis}</td>
                                        <td>{element.element.location}</td>
                                        <td>{element.element.comment}</td>
                                        <td>{element.author.email}</td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td>No data recorded</td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>

                
            {/* </section> */}

            {/* <section className="glass">
                <h3>Glass:</h3>
            </section> */}
            
            {/* //TODO take this out and solve with Context */}
            {user
                    ?
                    <div>
                        <form action={onAddElement}>
                            <div className="input-group">
                                <select id="material" name="material" required>
                                    <option value="">Select material</option>
                                    <option value="Structural Timber">Structural Timber</option>
                                    <option value="Structural Steel">Structural Steel</option>
                                    <option value="Glass">Glass</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="location">Location</label>
                                <input type="text" id="location" name="location" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="elementType">Element Type</label>
                                <input type="text" id="elementType" name="elementType" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="profile">Profile</label>
                                <input type="text" id="profile" name="profile" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="count">Count</label>
                                <input type="number" id="count" name="count" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="lengthAxis">Length Axis</label>
                                <input type="number" id="lengthAxis" name="lengthAxis" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="comment">Comment</label>
                                <textarea type="text" id="comment" name="comment" required />
                            </div>

                            <button className="button" type="submit">Add Element</button>
                        </form>
                        {/* <p>or</p>
                        <p>Upload an Excel file</p>
                        <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
                        {jsonData && (
                            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                {JSON.stringify(jsonData, null, 2)}
                            </pre>
                        )} */}
                    </div>
                    :
                    <Link to="/login">
                        <p>Login to add elements.</p>
                    </Link>
                }

        </section>
    )
}