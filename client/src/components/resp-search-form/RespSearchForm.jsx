import React, { useState } from "react";
import buildWhereString from "../../utils/buildWhereString";
import CheckboxGroup from "./CheckboxGroup";

export default function RespSearchForm({ onSearch }) {
    const [profileType, setProfileType] = useState({
        rundprofil: false,
        rechteckprofil: false,
        iProfil: false,
        walzprofil: false,
    });

    const [material, setMaterial] = useState({
        holz: false,
        stahl: false,
        glas: false,
    });

    const respSearchHandler = () => {
        const whereString = buildWhereString({ profileType, material });
        onSearch(whereString);
    };

    return (
        <div className="search-box">
            <form className="respSearchForm" onSubmit={(e) => { e.preventDefault(); respSearchHandler(); }}>
                {/* Material Checkbox Group */}
                <CheckboxGroup 
                    label="Material" 
                    options={{ holz: false, stahl: false, glas: false }} 
                    selectedOptions={material}
                    setSelectedOptions={setMaterial} 
                />
                
                {/* Profile Type Checkbox Group */}
                <CheckboxGroup 
                    label="Profiltyp" 
                    options={{ rechteckprofil: false, rundprofil: false, iProfil: false, walzprofil: false }} 
                    selectedOptions={profileType}
                    setSelectedOptions={setProfileType} 
                />

                <button type="submit">Search</button>
            </form>
        </div>
    );
}
