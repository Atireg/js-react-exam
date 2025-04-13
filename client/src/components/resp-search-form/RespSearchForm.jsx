import { useState } from "react";

export default function RespSearchForm({ onSearch }) {
    const [profileType, setProfileType] = useState({
        rundprofil: '',
        rechteckprofil: false,
        iProfile: false,
        walzprofil: false,
    });

    const [material, setMaterial] = useState({
        holz: false,
        stahl: false,
        glas: false,
    });

    const buildWhereString = ({ profileType, material }) => {
        const conditions = [];

        //TODO Make one util function out of this
        const selectedProfiles = Object.entries(profileType)
            .filter(([, checked]) => checked)
            .map(([mat]) => `"${mat.charAt(0).toUpperCase() + mat.slice(1)}"`);

        const selectedMaterials = Object.entries(material)
            .filter(([, checked]) => checked)
            .map(([mat]) => `"${mat.charAt(0).toUpperCase() + mat.slice(1)}"`);

        //TODO Make one util function out of this
        if (selectedProfiles.length > 0) {
            if (selectedProfiles.length === 1) {
                conditions.push(`profileType=${selectedProfiles[0]}`);
            } else {
                conditions.push(`profileType IN (${selectedProfiles.join(", ")})`);
            }
        }

        if (selectedMaterials.length > 0) {
            if (selectedMaterials.length === 1) {
                conditions.push(`material=${selectedMaterials[0]}`);
            } else {
                conditions.push(`material IN (${selectedMaterials.join(", ")})`);
            }
        }


        return conditions.join(" AND ");
    };

    const respSearchHandler = () => {
        const whereString = buildWhereString({ profileType, material });
        onSearch(whereString);
    };

    return (
        <div className="search-box">
            <form className="respSearchForm" onSubmit={(e) => { e.preventDefault(); respSearchHandler() }}>
                {/* THIS IS ONE SEARCH CATEGORY */}
                <div className="subcategories-material">
                    <h4>Material</h4>
                    <label className="choice">
                        <input
                            type="checkbox"
                            checked={material.holz}
                            onChange={(e) =>
                                setMaterial({ ...material, holz: e.target.checked })
                            }
                        />
                        <p className="checkbox-mark">Holz</p>
                    </label>
                    <label className="choice">
                        <input
                            type="checkbox"
                            checked={material.stahl}
                            onChange={(e) =>
                                setMaterial({ ...material, stahl: e.target.checked })
                            }
                        />
                        <p className="checkbox-mark">Stahl</p>
                    </label>
                    <label className="choice">
                        <input
                            type="checkbox"
                            checked={material.glas}
                            onChange={(e) =>
                                setMaterial({ ...material, glas: e.target.checked })
                            }
                        />
                        <p className="checkbox-mark">Glas</p>
                    </label>
                </div>
                {/* ---------------------------*/}

                {/* THIS IS ONE SEARCH CATEGORY */}
                <div className="subcategories-profileType">
                    <h4>Profiltyp</h4>
                    <label className="choice">
                        <input
                            type="checkbox"
                            checked={profileType.rechteckprofil}
                            onChange={(e) =>
                                setProfileType({ ...profileType, rechteckprofil: e.target.checked })
                            }
                        />
                        <p className="checkbox-mark">Rechteckprofil</p>
                    </label>
                    <label className="choice">
                        <input
                            type="checkbox"
                            checked={profileType.rundprofil}
                            onChange={(e) =>
                                setProfileType({ ...profileType, rundprofil: e.target.checked })
                            }
                        />
                        <p className="checkbox-mark">Rundprofil</p>
                    </label>
                    <label className="choice">
                        <input
                            type="checkbox"
                            checked={profileType.iProfile}
                            onChange={(e) =>
                                setProfileType({ ...profileType, iProfile: e.target.checked })
                            }
                        />
                        <p className="checkbox-mark">I-Profile</p>
                    </label>
                    <label className="choice">
                        <input
                            type="checkbox"
                            checked={profileType.walzprofil}
                            onChange={(e) =>
                                setProfileType({ ...profileType, walzprofil: e.target.checked })
                            }
                        />
                        <p className="checkbox-mark">Walzprofil</p>
                    </label>

                </div>
                {/* ---------------------------*/}

                <button type="submit">Search</button>
            </form>
        </div>
    )
}