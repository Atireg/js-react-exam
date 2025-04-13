import { useState } from "react";
import RespSearchForm from "../resp-search-form/RespSearchForm";
import ElementsCategory from "./ElementsCategory";
import SearchForm from "./search-form/SearchForm";
import { useGetElements } from "../../api/elementsApi";

export default function ElementsCatalog() {

    const [whereString, setWhereString] = useState(null);
    const { elements } = useGetElements({ whereString });

    const handleSearch = (newWhere) => {
        setWhereString(newWhere);
    }

        return (
            <section className="main-content">
                {/* <h2>Categories</h2>
            <div className="elements-categories">
                <ElementsCategory filterParam="material" filterValue="Holz" />
                <ElementsCategory filterParam="material" filterValue="Stahl" />
                <ElementsCategory filterParam="material" filterValue="Glas" />
            </div> */}
                {/* <h2>Search</h2> */}
                {/* <SearchForm /> */}
                <h2>Search Parameters</h2>
                <RespSearchForm onSearch={handleSearch} />
                <ElementsCategory elements={elements} />
            </section>
        )
    }

