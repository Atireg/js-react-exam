import { Link } from "react-router";
import elementsService from "../../../services/elementsService";

export default function ReuseSteelTable({
    user,
    projectId,
    elements
}) {
    const addNewElementAction = async (formData) => {
        const element =  Object.fromEntries(formData)

        const addedData = await elementsService.add(user, projectId, element);

        console.log(addedData);

    }

    return (
        <div className="inventory-table-container">
            {elements.length > 0
                ?
                <table>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Element Type</th>
                            <th>Profile</th>
                            <th>Count</th>
                            <th>Length Axis</th>
                            <th>Comment</th>
                            <th>Added By</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Dach-Ost</td>
                            <td>Sparren</td>
                            <td>IPE 200</td>
                            <td>8</td>
                            <td>7.55</td>
                            <td>None</td>
                            <td>Gergana Rusenova</td>
                        </tr>
                    </tbody>
                </table>
                :
                <p>No elements available</p>
            }


            {user
                &&
                <h3>Hello, {user}! Do you want to add a new element? </h3>}

            <form action={addNewElementAction}>
                <div className="input-group">
                    <select id="material" name="material" required>
                        <option value="">Select material</option>
                        <option value="Structural Timber">Structural Timber</option>
                        <option value="Structural Steel">Structural Steel</option>
                        <option value="Structural Glass">Structural Glass</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" required />
                </div>
                <div className="input-group">
                    <label htmlFor="element-type">Element Type</label>
                    <input type="text" id="element-type" name="element-type" required />
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

            {!user
                &&
                <Link to="/login">
                    <p>Login to add elements.</p>
                </Link>
            }

        </div>
    )
}