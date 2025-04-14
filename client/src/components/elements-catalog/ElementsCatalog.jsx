import { useState } from "react";
import RespSearchForm from "../resp-search-form/RespSearchForm";
import ElementsCategory from "./ElementsCategory";
import { useGetElements } from "../../api/elementsApi";

export default function ElementsCatalog() {

    const [whereString, setWhereString] = useState(null);
    const { elements } = useGetElements({ whereString });

    console.log(whereString);
    console.log(elements);

    const handleSearch = (newWhere) => {
        setWhereString(newWhere);
    }

    return (
        <section className="main-content">
            <h2>Search Parameters</h2>
            <RespSearchForm onSearch={handleSearch} />
            <section className='elements-category'>
                {elements.length > 0 ?
                    <ElementsCategory elements={elements} />
                    :
                    <h4>No elements found... Try again! </h4>
                }
            </section>
        </section>
    )
}

