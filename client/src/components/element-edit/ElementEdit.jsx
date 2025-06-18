import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditElement } from "../../api/elementsApi";

export default function ElementEdit() {
    const { elementId } = useParams();
    const navigate = useNavigate();
    const { editElement } = useEditElement();
    const [element, setElement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [material, setMaterial] = useState("");
    const [elementType, setElementType] = useState("");
    const [profileType, setProfileType] = useState("");
    const [fireProtection, setFireProtection] = useState("");

    useEffect(() => {
        // Fetch the element data
        fetch(`${import.meta.env.VITE_APP_SERVER_URL}/data/elements/${elementId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch element');
                }
                return res.json();
            })
            .then(data => {
                setElement(data);
                // Initialize form state with current values
                setMaterial(data.element.material || "");
                setElementType(data.element.elementType || "");
                setProfileType(data.element.profileType || "");
                setFireProtection(data.element.fireProtection || "");
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch element:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [elementId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const elementData = {
            element: Object.fromEntries(formData)
        };

        try {
            await editElement(elementId, elementData);
            // Navigate back to the previous page
            navigate(-1);
        } catch (error) {
            console.error('Failed to update element:', error);
            setError(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!element) return <div>Element not found</div>;

    return (
        <div className="container-edit-element">
            <h3>Bauteil bearbeiten:</h3>
            <form className="formEditElement" onSubmit={handleSubmit}>
                <h4>Allgemeine Angaben:</h4>

                <div className="input-group">
                    <label htmlFor="loadBearing">Tragend</label>
                    <select
                        id="loadBearing"
                        name="loadBearing"
                        defaultValue={element.element.loadBearing}
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
                        defaultValue={element.element.member}
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
                        onChange={(e) => setMaterial(e.target.value)}
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
                        defaultValue={element.element.function}
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
                        defaultValue={element.element.quantity}
                        required
                    />
                </div>

                {material === "Stahl" && (
                    <div className="input-group">
                        <label htmlFor="elementType">Art</label>
                        <select
                            id="elementType"
                            name="elementType"
                            value={elementType}
                            onChange={(e) => setElementType(e.target.value)}
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
                    </div>
                )}

                {material === "Stahl" && (
                    <div className="input-group">
                        <label htmlFor="profileType">Profilart</label>
                        <select
                            id="profileType"
                            name="profileType"
                            value={profileType}
                            onChange={(e) => setProfileType(e.target.value)}
                            required
                        >
                            <option value="">Bitte wählen</option>
                            <option value="IProfil">IProfil</option>
                            <option value="UProfil">UProfil</option>
                            <option value="LProfil">LProfil</option>
                            <option value="TProfil">TProfil</option>
                            <option value="Keine Angabe">Keine Angabe</option>
                        </select>
                    </div>
                )}

                <div className="input-group">
                    <label htmlFor="length">Länge (mm)</label>
                    <input
                        type="number"
                        id="length"
                        name="length"
                        step="10"
                        min="100"
                        defaultValue={element.element.length}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="width">Breite (mm)</label>
                    <input
                        type="number"
                        id="width"
                        name="width"
                        step="10"
                        min="100"
                        defaultValue={element.element.width}
                        required
                    />
                </div>

                {elementType !== 'Rundprofil' && elementType !== "Sonderfall" && elementType !== 'Walzprofil' && (
                    <div className="input-group">
                        <label htmlFor="height">Höhe (mm)</label>
                        <input
                            type="number"
                            id="height"
                            name="height"
                            step="10"
                            min="100"
                            defaultValue={element.element.height}
                            required
                        />
                    </div>
                )}

                {material === "Stahl" && (
                    <div className="input-group">
                        <label htmlFor="fireProtection">Brandschutz</label>
                        <select
                            id="fireProtection"
                            name="fireProtection"
                            value={fireProtection}
                            onChange={(e) => setFireProtection(e.target.value)}
                            required
                        >
                            <option value="">Bitte wählen</option>
                            <option value="Verzinkung">Verzinkung</option>
                            <option value="Keine Angabe">Keine Angabe</option>
                        </select>
                    </div>
                )}

                {fireProtection && fireProtection !== "Keine Angabe" && (
                    <div className="input-group">
                        <label htmlFor="fPrThickness">Schichtdicke (mm)</label>
                        <input
                            type="number"
                            id="fPrThickness"
                            name="fPrThickness"
                            step="0.1"
                            min="1"
                            defaultValue={element.element.fPrThickness}
                            required
                        />
                    </div>
                )}

                <div className="input-group">
                    <label htmlFor="comment">Kommentar</label>
                    <textarea
                        id="comment"
                        name="comment"
                        defaultValue={element.element.comment}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="button">Speichern</button>
                    <button type="button" className="button" onClick={() => navigate(-1)}>Abbrechen</button>
                </div>
            </form>
        </div>
    );
} 