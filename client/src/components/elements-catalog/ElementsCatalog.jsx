import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ElementsCategory from "./ElementsCategory";

export default function ElementsCatalog() {
    const { email } = useContext(UserContext);

    return (
        <section className="centered-container">
            <h2>Hello{email ? `, ${email}` : ''}! Harvest your ReUse elements here!</h2>
            <div className="elements-categories">
                <section className='elements-category'>
                    <ElementsCategory filterParam="Holz" />    
                </section>
                <section className='elements-category'>
                    <ElementsCategory filterParam="Stahl" />    
                </section>
                <section className='elements-category'>
                    <ElementsCategory filterParam="Glas" />    
                </section>
            </div>
        </section>
    )
}

