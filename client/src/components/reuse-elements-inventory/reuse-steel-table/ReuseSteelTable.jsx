export default function ReuseSteelTable() {
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
        </div>
    )
}