import ReuseSteelTable from "./reuse-steel-table/ReuseSteelTable";

export default function ReuseElementsInventory({
    user,
    projectId,
    elements
}) {
    return (
        <section className="reuse-elements-inventory">
            <section>
                <h2>Harvested Building Elements:</h2>
            </section>

            <section className="structural-timber">
                <h3>Structural Timber</h3>
            </section>

            <section className="structural-steel">
                <h3>Structural Steel: </h3>
                <ReuseSteelTable user={user} projectId={projectId} elements={elements}/>

            </section>

            <section className="glass">
                <h3>Glass</h3>
            </section>
        </section>
    )
}