import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ElementsCategory from "./ElementsCategory";

export default function ElementsCatalog() {
    const { email } = useContext(UserContext);

    return (
        <section className="centered-container">
            <h2>Hello{email ? `, ${email}` : ''}! Harvest your ReUse elements here!</h2>
            <div className="elements-categories">
                <section>
                    <h3>Holz</h3>
                    <ElementsCategory filterParam="Holz" />    
                </section>
                <section>
                    <h3>Stahl</h3>
                    <ElementsCategory filterParam="Stahl" />    
                </section>
                <section>
                    <h3>Glas</h3>
                    <ElementsCategory filterParam="Glas" />    
                </section>
            </div>
        </section>
    )
}

