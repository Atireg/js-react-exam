import { UserContext } from "../../contexts/UserContext";
import ElementsCategory from "./ElementsCategory";
import SearchForm from "./search-form/SearchForm";

export default function ElementsCatalog() {
 
    return (
        <section className="main-content">
            <h2>Categories</h2>
            <div className="elements-categories">
                <ElementsCategory filterParam="material" filterValue="Holz" />
                <ElementsCategory filterParam="material" filterValue="Stahl" />
                <ElementsCategory filterParam="material" filterValue="Glas" />
            </div>
            <h2>Search</h2>
            <SearchForm />
        </section>
    )
}

