import { useState } from "react";
import SearchItems from "../search-items/SearchItems";

export default function SearchForm() {
    const [selected, setSelected] = useState('');

    const onChangeHandler = (event) => {
        setSelected(event.target.value);
    };
 
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div >
            <form className="search-form" onSubmit={onSubmitHandler}>
                <label className="search-param">Profil</label>
                <div className="search-group" >
                    <div>
                        <label className="choice">
                        <input
                                type="radio"
                                name="profile"
                                value="Rechteckprofil"
                                checked={selected === "Rechteckprofil"}
                                onChange={onChangeHandler}
                            />
                            <p className="radio-mark">Rechteckprofil</p>
                        </label>
                    </div>
                    <div>
                        <label className="choice">
                        <input
                                type="radio"
                                name="profile"
                                value="IPE100"
                                checked={selected === "IPE100"}
                                onChange={onChangeHandler}
                            />
                            <p className="radio-mark">IPE100</p>
                        </label>
                    </div>
                    <div>
                        <label className="choice">
                            <input
                                type="radio"
                                name="profile"
                                value="Rundprofil"
                                checked={selected === "Rundprofil"}
                                onChange={onChangeHandler}
                            />
                            <p className="radio-mark">Rundprofil</p>
                        </label>
                    </div>
                </div>
            </form>

            <SearchItems selected={selected} />

        </div>
    )
}