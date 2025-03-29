export default function ReuseSteelTable({
    user,
}) {

    const addNewElementAction = (formData) => {
        const location = formData.get('location');
        const elementType = formData.get('element-type');
        const profile = formData.get('profile');
        const count = formData.get('count');
        const lengthAxis = formData.get('lengthAxis');
        const comment = formData.get('comment');

        console.log(location);
        

    }
    
    return (
        <div className="inventory-table-container">
            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Element Type</th>
                        <th>Profile</th>
                        <th>Count</th>
                        <th>Length Axis</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dach-Ost</td>
                        <td>Sparren</td>
                        <td>IPE 200</td>
                        <td>8</td>
                        <td>7.55</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Dach-Ost</td>
                        <td>Sparren</td>
                        <td>IPE 200</td>
                        <td>8</td>
                        <td>3.42</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Dach-Ost</td>
                        <td>Sparren</td>
                        <td>IPE 240</td>
                        <td>3</td>
                        <td>7.55</td>
                        <td>Löcher im Abstand 3,74m</td>
                    </tr>
                    <tr>
                        <td>Dach-Ost</td>
                        <td>Pfetten</td>
                        <td>HEA 100</td>
                        <td>6</td>
                        <td>11.40</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Dach-Ost</td>
                        <td>Pfetten</td>
                        <td>IPE 100</td>
                        <td>26</td>
                        <td>11.40</td>
                        <td>Löcher im Abstand 3,74m</td>
                    </tr>
                </tbody>
            </table>

            <h3>Hello, {user}! Do you want to add a new element? </h3>

            <form action={addNewElementAction}>
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
                    <textarea input type="text" id="comment" name="comment" required />
                </div>
                
                <button className="button" type="submit">Add Element</button>
            </form>

        </div>
    )
}