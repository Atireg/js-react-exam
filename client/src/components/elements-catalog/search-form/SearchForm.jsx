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
        <div >
            <form className="search-form" onSubmit={onSubmitHandler}>
                <label>Profil</label>
                <div className="search-group" >
                    <div>
                        <label className="choice">
                            <input
                                type="radio"
                                name="Rechteckprofil"
                                checked={setSelected === "Rechteckprofil"}
                                onChange={onChangeHandler}
                                disabled={false}
                            />
                            <p>Rechteckprofil</p>
                        </label>
                    </div>
                    <div>
                        <label className="choice">
                            <input
                                type="radio"
                                name="IPE100"
                                checked={setSelected === "IPE100"}
                                onChange={onChangeHandler}
                                disabled={false}
                            />
                            <p>IPE100</p>
                        </label>
                    </div>
                    <div>
                        <label className="choice">
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