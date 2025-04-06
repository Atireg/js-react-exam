import { useState } from "react"
import SearchItems from "../search-items/SearchItems";

export default function SearchForm() {

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

    return (
        <div className="centered-container">
            <form className="filter-form" onSubmit={onSubmitHandler}>
                <h2>Search</h2>
                <div className="filter-group">
                    <label>Profile Type</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="Rechteckprofil"
                                checked={setSelected === "Rechteckprofil"}
                                onChange={onChangeHandler}
                                disabled={false}
                            />
                            Rechteckprofil
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="IPE100"
                                checked={setSelected === "IPE100"}
                                onChange={onChangeHandler}
                                disabled={false}
                            />
                            IPE100
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="Rundprofil"
                                checked={setSelected === "Rundprofil"}
                                onChange={onChangeHandler}
                                disabled={false}
                            />
                            Rundprofil
                        </label>
                    </div>
                </div>
            </form>

            <SearchItems selected={selected}/>
     
        </div>
    )
}