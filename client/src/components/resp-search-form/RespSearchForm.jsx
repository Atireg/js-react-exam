import React, { useState } from "react";
import buildWhereString from "../../utils/buildWhereString";

const handleCheckboxChange = (state, setState, fieldName, value) => {
    setState({ ...state, [fieldName]: value });
};

const CheckboxGroup = ({ label, options, selectedOptions, setSelectedOptions }) => {
    return (
        <div className="subcategories">
             <p className="elements-individual">{label}:</p>
            {Object.entries(options).map(([key]) => (
                <label className="choice" key={key}>
                    <input
                        type="checkbox"
                        checked={selectedOptions[key]}
                        onChange={(e) => 
                            handleCheckboxChange(
                                selectedOptions,
                                setSelectedOptions,
                                key,
                                e.target.checked
                            )
                        }
                    />
                    <p className="checkbox-mark">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                </label>
            ))}
        </div>
    );
};

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

    const [profile, setProfile] = useState({
        IPE100: false,
        IPE120: false,
        IPE200: false,
        HEA100: false,
        HEA120: false,
        HEA200: false,
        HEB100: false,
        HEB120: false,
        HEB200: false,
    });


    const [condition, setCondition] = useState({
        ausreichend: false,
        sehrGut: false,
        gut: false,
    });

    const respSearchHandler = () => {
        const whereString = buildWhereString({ profileType, material, profile, condition });
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
                    label="Profilart" 
                    options={{ rechteckprofil: false, rundprofil: false, iProfil: false, walzprofil: false }} 
                    selectedOptions={profileType}
                    setSelectedOptions={setProfileType} 
                />

                {/* Profile Checkbox Group */}
                <CheckboxGroup 
                    label="Profil" 
                    options={{
                        IPE100: false,
                        IPE120: false,
                        IPE200: false,
                        HEA100: false,
                        HEA120: false,
                        HEA200: false,
                        HEB100: false,
                        HEB120: false,
                        HEB200: false,}} 
                    selectedOptions={profile}
                    setSelectedOptions={setProfile} 
                />

                {/* Profile Checkbox Group */}
                <CheckboxGroup 
                    label="Zustand" 
                    options={{
                        ausreichend: false, sehrGut: false, gut: false }} 
                    selectedOptions={condition}
                    setSelectedOptions={setCondition} 
                />

                <button type="submit">Search</button>
            </form>
        </div>
    );
}
