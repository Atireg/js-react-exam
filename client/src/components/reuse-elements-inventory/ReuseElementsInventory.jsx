import { Link } from "react-router";
import idSlicer from "../../utils/idSlicer";
import ExcelToJson from "./ExcelUpload";
import { useState } from "react";
import VerticalArrowCell from "./VerticalArrowCell";

export default function ReuseElementsInventory({
    user,
    elements,
    onAddElement
}) {
    const [material, setMaterial] = useState("");
    const [elementType, setElementType] = useState("");
    const [profileType, setProfileType] = useState("");
    const [fireProtection, setFireProtection] = useState("");
    const [openGroup, setOpenGroup] = useState(null);

    const materialChangeHandler = (e) => {
        setMaterial(e.target.value);
    };

    const profileTypeChangeHandler = (e) => {
        setProfileType(e.target.value);
    };

    const elementTypeChangeHandler = (e) => {
        setElementType(e.target.value);
    };

    const fireProtectionChangeHandler = (e) => {
        setFireProtection(e.target.value);
    };

    const toggleGroup = (groupName) => {
        if (openGroup === groupName) {
            setOpenGroup(null);
        } else {
            setOpenGroup(groupName);
        }
    };

    const isGroupOpen = (groupName) => openGroup === groupName;

    return (
        <section className="elements-table">
            <section>
                <h2>Harvested Building Elements</h2>
            </section>

            <div className="inventory-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tragend</th>
                            <th>Bauteil</th>
                            <th>Material</th>
                            <th>Funktion</th>
                            <th>Menge</th>
                            <th>Art</th>
                            <th>Profilart</th>
                            <th>Profil</th>
                            <th>Verbindung</th>
                            <th>Baujahr</th>
                            <th>Zustand</th>

                            <th className="arrow-cell"></th>
                            {isGroupOpen('dimensions') && (
                                <>
                                    <th>Länge (mm)</th>
                                    <th>Breite (mm)</th>
                                    <th>Höhe (mm)</th>
                                    <th>tw</th>
                                    <th>tf</th>
                                    <th>r</th>
                                    <th>d</th>
                                    <th>Durchmesser</th>
                                    <th>t</th>
                                </>
                            )}

                            <th className="arrow-cell"></th>
                            {isGroupOpen('material') && (
                                <>
                                    <th>Werkstoff</th>
                                    <th>Materialgüte</th>
                                </>
                            )}

                            <th className="arrow-cell"></th>
                            {isGroupOpen('technical') && (
                                <>
                                    <th>Brandschutz</th>
                                    <th>Schichtdicke</th>
                                    <th>Oberflächenbehandlung</th>
                                </>
                            )}

                            <th className="arrow-cell"></th>
                            {isGroupOpen('physical') && (
                                <>
                                    <th>U-Wert</th>
                                    <th>Feuchtigkeit</th>
                                    <th>Schallschutz</th>
                                </>
                            )}

                            <th className="arrow-cell"></th>
                            {isGroupOpen('regulatory') && (
                                <>
                                    <th>Verwendbarkeits-NW</th>
                                    <th>Ausführungspläne</th>
                                    <th>Bestandstatik</th>
                                </>
                            )}

                            <th className="arrow-cell"></th>
                            {isGroupOpen('dismantling') && (
                                <>
                                    <th>Rückbauart</th>
                                    <th>Aufwand</th>
                                    <th>Eignung für</th>
                                </>
                            )}

                            <th>Kommentar</th>
                            <th>Hinzugefügt von</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements?.length > 0 ? (
                            elements.map((item, index) => (
                                <tr key={item._id} className="element" style={{ color: item.pending ? 'lightgray' : '' }}>
                                    <td>#{idSlicer(item._id)}</td>
                                    <td>{item.element.loadBearing}</td>
                                    <td>{item.element.member}</td>
                                    <td>{item.element.material}</td>
                                    <td>{item.element.function}</td>
                                    <td>{item.element.quantity}</td>
                                    <td>{item.element.elementType}</td>
                                    <td>{item.element.profileType}</td>
                                    <td>{item.element.profile}</td>
                                    <td>{item.element.connectionType}</td>
                                    <td>{item.element.manufacturingYear}</td>
                                    <td>{item.element.condition}</td>

                                    {index === 0 && (
                                        <VerticalArrowCell
                                            label="Dimensionen"
                                            onClick={() => toggleGroup('dimensions')}
                                            isOpen={isGroupOpen('dimensions')}
                                            rowSpan={elements.length}
                                        />
                                    )}

                                    {isGroupOpen('dimensions') && (
                                        <>
                                            <td>{item.element.length}</td>
                                            <td>{item.element.width}</td>
                                            <td>{item.element.height}</td>
                                            <td>{item.element.tw}</td>
                                            <td>{item.element.tf}</td>
                                            <td>{item.element.r}</td>
                                            <td>{item.element.d}</td>
                                            <td>{item.element.diameter}</td>
                                            <td>{item.element.t}</td>
                                        </>
                                    )}

                                    {index === 0 && (
                                        <VerticalArrowCell
                                            label="Materialleigenschaften"
                                            onClick={() => toggleGroup('material')}
                                            isOpen={isGroupOpen('material')}
                                            rowSpan={elements.length}
                                        />
                                    )}

                                    {isGroupOpen('material') && (
                                        <>
                                            <td>{item.element.specification}</td>
                                            <td>{item.element.quality}</td>
                                        </>
                                    )}

                                    {index === 0 && (
                                        <VerticalArrowCell
                                            label="Technische Eigenschaften"
                                            onClick={() => toggleGroup('technical')}
                                            isOpen={isGroupOpen('technical')}
                                            rowSpan={elements.length}
                                        />
                                    )}
                                    {isGroupOpen('technical') && (
                                        <>
                                            <td>{item.element.fireProtection}</td>
                                            <td>{item.element.fPrThickness}</td>
                                            <td>{item.element.surfaceTreatment}</td>
                                        </>
                                    )}

                                    {index === 0 && (
                                        <VerticalArrowCell
                                            label="Bauphysikalische Eigenschaften"
                                            onClick={() => toggleGroup('physical')}
                                            isOpen={isGroupOpen('physical')}
                                            rowSpan={elements.length}
                                        />
                                    )}
                                    {isGroupOpen('physical') && (
                                        <>
                                            <td>{item.element.uValue}</td>
                                            <td>{item.element.humidity}</td>
                                            <td>{item.element.soundproofing}</td>
                                        </>
                                    )}

                                    {index === 0 && (
                                        <VerticalArrowCell
                                            label="Bauaufsichtliche Regelung"
                                            onClick={() => toggleGroup('regulatory')}
                                            isOpen={isGroupOpen('regulatory')}
                                            rowSpan={elements.length}
                                        />
                                    )}

                                    {isGroupOpen('regulatory') && (
                                        <>
                                            <td>{item.element.nW}</td>
                                            <td>{item.element.shopDrawings}</td>
                                            <td>{item.element.structuralCalcs}</td>
                                        </>
                                    )}

                                    {index === 0 && (
                                        <VerticalArrowCell
                                            label="Rückbau & ReUse"
                                            onClick={() => toggleGroup('dismantling')}
                                            isOpen={isGroupOpen('dismantling')}
                                            rowSpan={elements.length}
                                        />
                                    )}
                                    {isGroupOpen('dismantling') && (
                                        <>
                                            <td>{item.element.dismantlingType}</td>
                                            <td>{item.element.effort}</td>
                                            <td>{item.element.suitableFor}</td>
                                        </>
                                    )}
                                    <td>{item.element.comment}</td>
                                    <td>{item.author.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="14">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {user
                ?
                <div>
                    <h2>Add a new element</h2>
                    <form action={onAddElement}>

                        <div className="input-group">
                            <label htmlFor="loadBearing">Tragend</label>
                            <select
                                id="loadBearing"
                                name="loadBearing"
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="Ja">Ja</option>
                                <option value="Nein">Nein</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="member">Bauteil</label>
                            <select
                                id="member"
                                name="member"
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="Stütze">Stütze</option>
                                <option value="Träger">Träger</option>
                                <option value="Fassade">Fassade</option>
                                <option value="Keine Angabe">Keine Angabe</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="material">Material</label>
                            <select
                                id="material"
                                name="material"
                                value={material}
                                onChange={materialChangeHandler}
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="Holz">Holz</option>
                                <option value="Stahl">Stahl</option>
                                <option value="Glas">Glas</option>
                                <option value="Anderes">Anderes</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="function">Funktion</label>
                            <textarea
                                id="function"
                                name="function"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="quantity">Menge</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                required
                            />
                        </div>

                        {material === "Stahl" &&
                            <div className="input-group">
                                <label htmlFor="elementType">Art (elementType)</label>
                                <select
                                    id="elementType"
                                    name="elementType"
                                    value={elementType}
                                    onChange={elementTypeChangeHandler}
                                    required
                                >
                                    <option value="">Bitte wählen</option>
                                    <option value="Rundprofil">Rundprofil</option>
                                    <option value="Rechteckprofil">Rechteckprofil</option>
                                    <option value="Hohlprofil">Hohlprofil</option>
                                    <option value="Walzprofil">Walzprofil</option>
                                    <option value="Schweißprofil">Schweißprofil</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Stahl" &&
                            <div className="input-group">
                                <label htmlFor="profileType">Profilart</label>
                                <select
                                    id="profileType"
                                    name="profileType"
                                    value={profileType}
                                    onChange={profileTypeChangeHandler}
                                    required>
                                    <option value="">Bitte wählen</option>
                                    <option value="IProfil">IProfil</option>
                                    <option value="Rechteckprofil">Rechteckprofil</option>
                                    <option value="Rundprofil">Rundprofil</option>
                                    <option value="Hohlprofil">Hohlprofil</option>
                                    <option value="Sonderfall">Sonderfall</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Holz" &&
                            <div className="input-group">
                                <label htmlFor="profileType">Profilart</label>
                                <select id="profileType"
                                    name="profileType"
                                    value={profileType}
                                    onChange={profileTypeChangeHandler}
                                    required>
                                    <option value="">Bitte wählen</option>
                                    <option value="Rundprofil">Rundprofil</option>
                                    <option value="Rechteckprofil">Rechteckprofil</option>
                                    <option value="Sonderfall">Sonderfall</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Stahl" &&
                            <div className="input-group">
                                <label htmlFor="profile">Profil</label>
                                <select id="profile" name="profile" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="IPE100">IPE100</option>
                                    <option value="IPE120">IPE120</option>
                                    <option value="Rohr">Rohr</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Holz" &&
                            <div className="input-group">
                                <label htmlFor="connectionType">Verbindung</label>
                                <select id="connectionType" name="connectionType" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="geschraubt ">Geschraubt </option>
                                    <option value="eingehängt">Eingehängt</option>
                                    <option value="vernagelt">Vernagelt</option>
                                    <option value="verkeilt">Verkeilt</option>
                                    <option value="ineineinander geschoben">Ineineinander Geschoben</option>
                                    <option value="gefüllt">Gefüllt</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Stahl" &&
                            <div className="input-group">
                                <label htmlFor="connectionType">Verbindung</label>
                                <select id="connectionType" name="connectionType" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="geschweißt">Geschweißt</option>
                                    <option value="geschraubt ">Geschraubt </option>
                                    <option value="gegossen">Gegossen</option>
                                    <option value="eingehängt">Eingehängt</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        <div className="input-group">
                            <label htmlFor="manufacturingYear">Baujahr</label>
                            <input
                                type="number"
                                id="manufacturingYear"
                                min="1920"
                                name="manufacturingYear"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="condition">Zustand</label>
                            <select id="condition" name="condition" required>
                                <option value="">Bitte wählen</option>
                                <option value="Ausreichend">Ausreichend</option>
                                <option value="Gut">Gut</option>
                                <option value="Sehr Gut">Sehr Gut</option>
                                <option value="Keine Angabe">Keine Angabe</option>
                            </select>
                        </div>

                        <h3 className="addElementForm">Materialeigenschaften:</h3>

                        {material === "Holz" &&
                            <div className="input-group">
                                <label htmlFor="specification">Werkstoff</label>
                                <select id="specification" name="specification" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="KVH">KVH</option>
                                    <option value="BSH">BSH</option>
                                    <option value="BSP">BSP</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Stahlbeton" || material === "Beton" &&
                            <div className="input-group">
                                <label htmlFor="specification">Werkstoff</label>
                                <select id="specification" name="specification" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="Fertigteil">Fertigteil</option>
                                    <option value="Halbfertigteil">Halbfertigteil</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Holz" &&
                            <div className="input-group">
                                <label htmlFor="quality">Materialgüte</label>
                                <select id="quality" name="quality" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="C24">C24</option>
                                    <option value="GL24h">GL24h</option>
                                    <option value="C16">C16</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Stahl" &&
                            <div className="input-group">
                                <label htmlFor="quality">Materialgüte</label>
                                <select id="quality" name="quality" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="S235">S235</option>
                                    <option value="S335">S335</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        <h3 className="addElementForm">Dimensionen:</h3>

                        <div className="input-group">
                            <label htmlFor="length">Länge (mm)</label>
                            <input
                                type="number"
                                id="length"
                                name="length"
                                step="10"
                                min="100"
                                required
                            />
                        </div>

                        {elementType && elementType !== 'Rundprofil'
                            || elementType !== "Sonderfall"
                            || profileType !== 'Rundprofil'
                            || material === 'Glas'
                            &&
                            <div className="input-group">
                                <label htmlFor="width">Breite (mm)</label>
                                <input
                                    type="number"
                                    id="width"
                                    name="width"
                                    step="10"
                                    min="100"
                                    required
                                />
                            </div>}

                        {material === 'Glas' &&
                        <div className="input-group">
                        <label htmlFor="width">Breite (mm)</label>
                        <input
                            type="number"
                            id="width"
                            name="width"
                            step="10"
                            min="100"
                            required
                        />
                    </div>
                        }

                        {elementType !== 'Rundprofil' || elementType !== "Sonderfall" &&
                            <div className="input-group">
                                <label htmlFor="height">Höhe (mm)</label>
                                <input
                                    type="number"
                                    id="height"
                                    name="height"
                                    step="10"
                                    min="100"
                                    required
                                />
                            </div>}

                        {elementType === 'IProfil' &&
                            <div className="input-group">
                                <label htmlFor="tw">tw (mm)</label>
                                <input
                                    type="number"
                                    id="tw"
                                    name="tw"
                                    step="0.1"
                                    min="1"
                                    required
                                />
                            </div>}

                        {elementType === 'IProfil' &&
                            <div className="input-group">
                                <label htmlFor="tf">tf (mm)</label>
                                <input
                                    type="number"
                                    id="tf"
                                    name="tf"
                                    step="0.1"
                                    min="1"
                                    required
                                />
                            </div>}

                        {elementType === 'IProfil' &&
                            <div className="input-group">
                                <label htmlFor="r">r (mm)</label>
                                <input
                                    type="number"
                                    id="r"
                                    name="r"
                                    step="0.1"
                                    min="1"
                                    required
                                />
                            </div>}


                        {elementType === 'IProfil' &&
                            <div className="input-group">
                                <label htmlFor="d">d (mm)</label>
                                <input
                                    type="number"
                                    id="d"
                                    name="d"
                                    step="0.1"
                                    min="1"
                                    required
                                />
                            </div>}

                        {elementType === 'Rundprofil' || profileType === 'Rundprofil' &&
                            <div className="input-group">
                                <label htmlFor="diameter">Durchmesser (mm)</label>
                                <input
                                    type="number"
                                    id="diameter"
                                    name="diameter"
                                    step="0.1"
                                    min="20"
                                    required
                                />
                            </div>}

                        {elementType === 'Rundprofil' && material !== "Holz" &&
                            <div className="input-group">
                                <label htmlFor="t">t (mm)</label>
                                <input
                                    type="number"
                                    id="t"
                                    name="t"
                                    step="0.1"
                                    min="1"
                                    required
                                />
                            </div>}

                        <h3 className="addElementForm">Technische Eigenschaften:</h3>

                        {material === "Holz" &&
                            <div className="input-group">
                                <label htmlFor="fireProtection">Brandschutz</label>
                                <select
                                    id="fireProtection"
                                    name="fireProtection"
                                    value={fireProtection}
                                    onChange={fireProtectionChangeHandler}
                                    required>
                                    <option value="">Bitte wählen</option>
                                    <option value="Beschichtung">Beschichtung</option>
                                    <option value="Bekleidung">Bekleidung</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Stahl" &&
                            <div className="input-group">
                                <label htmlFor="fireProtection">Brandschutz</label>
                                <select
                                    id="fireProtection"
                                    name="fireProtection"
                                    value={fireProtection}
                                    onChange={fireProtectionChangeHandler}
                                    required>
                                    <option value="">Bitte wählen</option>
                                    <option value="Verzinkung">Verzinkung</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Glas" &&
                            <div className="input-group">
                                <label htmlFor="fireProtection">Brandschutz</label>
                                <select
                                    id="fireProtection"
                                    name="fireProtection"
                                    value={fireProtection}
                                    onChange={fireProtectionChangeHandler}
                                    required>
                                    <option value="">Bitte wählen</option>
                                    <option value="option1">option1</option>
                                    <option value="option2">option2</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {fireProtection && fireProtection !== "Keine Angabe" &&
                            <div className="input-group">
                                <label htmlFor="fPrThickness">Schichtdicke (mm)</label>
                                <input
                                    type="number"
                                    id="fPrThickness"
                                    name="fPrThickness"
                                    step="0.1"
                                    min="1"
                                    required
                                />
                            </div>
                        }

                        {material === "Stahl" || material === "Holz" &&
                            <div className="input-group">
                                <label htmlFor="surfaceTreatment">Oberflächenbehandlung</label>
                                <select id="surfaceTreatment" name="surfaceTreatment" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="Geschichtet">Geschichtet</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Glas" &&
                            <h3 className="addElementForm">Bauphysikalische Eigenschaften:</h3>
                        }

                        {material === "Glas" &&
                            <div className="input-group">
                                <label htmlFor="uValue">U-Wert</label>
                                <select id="uValue" name="uValue" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="option1">Option1</option>
                                    <option value="option2">Option2</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Glas" &&
                            <div className="input-group">
                                <label htmlFor="humidity">Feuchtigkeit</label>
                                <select id="humidity" name="humidity" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="option1">Option1</option>
                                    <option value="option2">Option2</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        {material === "Glas" &&
                            <div className="input-group">
                                <label htmlFor="soundproofing">Schallschutz</label>
                                <select id="soundproofing" name="soundproofing" required>
                                    <option value="">Bitte wählen</option>
                                    <option value="option1">Option1</option>
                                    <option value="option2">Option2</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>
                            </div>}

                        <h3 className="addElementForm">Bauaufsichtliche Regelung:</h3>

                        <div className="input-group">
                            <label htmlFor="nW">Verwendbarkeits-NW vorliegend?</label>
                            <select
                                id="nW"
                                name="nW"
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="Ja">Ja</option>
                                <option value="Nein">Nein</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="shopDrawings">Ausführungspläne vorliegend?</label>
                            <select
                                id="shopDrawings"
                                name="shopDrawings"
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="Ja">Ja</option>
                                <option value="Nein">Nein</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="structuralCalcs">Bestandsstatik vorliegend?</label>
                            <select
                                id="structuralCalcs"
                                name="structuralCalcs"
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="Ja">Ja</option>
                                <option value="Nein">Nein</option>
                            </select>
                        </div>

                        <h3 className="addElementForm">Rückbau & ReUse:</h3>

                        <div className="input-group">
                            <label htmlFor="dismantlingType">Rückbauart</label>
                            <textarea id="dismantlingType" name="dismantlingType" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="effort">Aufwand</label>
                            <select
                                id="effort"
                                name="effort"
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="high">Hoch</option>
                                <option value="medium">Mittel</option>
                                <option value="low">Gering</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="suitableFor">Eignung für</label>
                            <select
                                id="suitableFor"
                                name="suitableFor"
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="preservation">Bestandserhalt</option>
                                <option value="reuse">Reuse</option>
                                <option value="recycling">Recycling</option>
                                <option value="disposal">Entsorgung</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="comment">Kommentar</label>
                            <textarea id="comment" name="comment" />
                        </div>


                        <button className="button" type="submit">Add Element</button>
                    </form>
                </div>
                :
                <Link to="/login">
                    <button>Login to add elements.</button>
                </Link>
            }

        </section >
    )
}