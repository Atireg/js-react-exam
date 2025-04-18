import { useNavigate } from 'react-router';
import { useAddProject } from '../../api/projectsApi';

export default function ProjectAdd() {
    const navigate = useNavigate();

    const { add: addProject } = useAddProject();

    const submitAction = async (formData) => {

        const projectData = Object.fromEntries(formData);

        await addProject(projectData);

        navigate('/projects')

    };

    return (
        <div className="centered-container">
            <h2>Neues Projekt anlegen</h2>

            <form className="formData" action={submitAction}>
                <div className='formSection'>
                    <div className="input-group">
                        <label htmlFor="name">Projektname</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="construction">Baujahr</label>
                        <input type="number" id="construction" name="construction" min="1700" max="2040" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="type">Gebäudeart</label>
                        <select id="type" name="type" required>
                            <option value="">Bitte wählen</option>
                            <option value="Hochhaus">Hochhaus</option>
                            <option value="Keine Angabe">Keine Angabe</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="purpose">Nutzung</label>
                        <select id="purpose" name="purpose" required>
                            <option value="">Bitte wählen</option>
                            <option value="Büro">Büro</option>
                            <option value="Wohnen">Wohnen</option>
                            <option value="Versammlungsstätten">Versammlungsstätten</option>
                            <option value="Keine Angabe">Keine Angabe</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="location">Standort</label>
                        <textarea id="location" name="location" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="demolition">Abrissdatum</label>
                        <input type="date" id="demolition" name="demolition" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="constructionType">Bauweise</label>
                        <select id="constructionType" name="constructionType" required>
                            <option value="">Bitte wählen</option>
                            <option value="Skelettbauweise">Skelettbauweise</option>
                            <option value="Schottenbauweise">Schottenbauweise</option>
                            <option value="Keine Angabe">Keine Angabe</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="bgf">BGF (m²)</label>
                        <input type="number" id="bgf" name="bgf" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="nuf">NUF (m²)</label>
                        <input type="number" id="nuf" name="nuf" required />
                    </div>

                </div>

                <div className='formSection'>
                    <div className="input-group">
                        <label htmlFor="client">Bauherr</label>
                        <textarea id="client" name="client" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="descriptionConstruction">Beschreibung Bauweise</label>
                        <textarea id="descriptionConstruction" name="descriptionConstruction" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="imageUrl">Enter image URL</label>
                        <input type="url" id="imageUrl" name="imageUrl" />
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
                        <label htmlFor="structuralCalcs">Statik vorliegend?</label>
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

                    <div className="input-group">
                        <label htmlFor="projectPlanning">Objektplanung</label>
                        <textarea id="projectPlanning" name="projectPlanning" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="structuralPlaning">Tragwerksplanung</label>
                        <textarea id="structuralPlaning" name="structuralPlaning" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="facadePlanning">Fassadenplanung</label>
                        <textarea id="facadePlanning" name="facadePlanning" required />
                    </div>

                    <div className="input-group">
                        <button type="submit">Speichern</button>
                    </div>
                </div>


            </form>
        </div>
    )
}