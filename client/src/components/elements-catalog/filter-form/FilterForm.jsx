import { useState } from "react"
import { useElements } from "../../../api/elementsApi";

export default function FilterForm() {

    const [selected, setSelected] = useState('')

    const onChangeHandler = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelected(name);
        } else {
            setSelected('');
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    //TODO disable the form while waiting for response from the server
    const { elements } = useElements({ filterParam: "profileType", filterValue: selected });

    console.log(elements);

    return (
        <form className="filter-form" onSubmit={onSubmitHandler}>
            <h2>Search</h2>
            <div className="filter-group">
                <label>Profile Type</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="Rechteckprofil"
                            checked={setSelected==="Rechteckprofil"}
                            onChange={onChangeHandler}
                        />
                        Rechteckprofil
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="IPE100"
                            checked={setSelected==="IPE100"}
                            onChange={onChangeHandler}
                        />
                        IPE100
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="Rundprofil"
                            checked={setSelected==="Rundprofil"}
                            onChange={onChangeHandler}
                        />
                        Rundprofil
                    </label>
                </div>
            </div>
            <button type="submit"></button>
        </form>
    )
}