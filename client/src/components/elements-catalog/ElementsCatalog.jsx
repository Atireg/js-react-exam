import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ElementsCategory from "./ElementsCategory";
import FilterForm from "./filter-form/FilterForm";

export default function ElementsCatalog() {
    const { email } = useContext(UserContext);

    return (
        <section className="centered-container">
            <h2>Hello{email ? `, ${email}` : ''}! Harvest your ReUse elements here!</h2>
            <div className="elements-categories">
                <ElementsCategory filterParam="material" filterValue="Holz" />
                <ElementsCategory filterParam="material" filterValue="Stahl" />
                <ElementsCategory filterParam="material" filterValue="Glas" />
            </div>
            <FilterForm />
        </section>
    )
}

