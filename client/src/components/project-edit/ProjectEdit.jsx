
import { Navigate, useNavigate, useParams } from "react-router"
import { useEditProject, useGetOneProject } from "../../api/projectsApi";

export default function ProjectEdit() {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { project } = useGetOneProject(projectId);
    const { edit } = useEditProject();

    const formAction = async (formData) => {
        const projectData = Object.fromEntries(formData);

        await edit(projectId, projectData);

        navigate(`/projects/${projectId}/details`)
    };

    return (
        <div className="centered-container">
            <h2>Edit Project Details</h2>
            
            <form className="formData" action={formAction}>

            <div className='formSection'>
                <div className="input-group">
                    <label htmlFor="name">Projektname</label>
                    <input type="text" id="name" name="name" defaultValue={project.name}
                    required={!project.name}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="construction">Baujahr</label>
                    <input type="number" id="construction" name="construction" defaultValue={project.construction} min="1700" max="2040" required={!project.construction}  />
                </div>
                
                <div className="input-group">
                    <label htmlFor="demolition">Abrissdatum</label>
                    <input type="date" id="demolition" name="demolition" required={!project.demolition} />
                </div>

                <div className="input-group">
                    <label htmlFor="type">Gebäudeart</label>
                    <select id="type" name="type" required={!project.type}>
                        <option value="">{project.type} </option>
                        <option value="Hochhaus">Hochhaus</option>
                        <option value="Keine Angabe">Keine Angabe</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="purpose">Nutzung</label>
                    <select id="purpose" name="purpose" required={!project.purpose}>
                        <option value="">{project.purpose} </option>
                        <option value="Büro">Büro</option>
                        <option value="Wohnen">Wohnen</option>
                        <option value="Versammlungsstätten">Versammlungsstätten</option>
                        <option value="Keine Angabe">Keine Angabe</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="location">Standort</label>
                    <textarea id="location" name="location" defaultValue={project.location} required={!project.location} />
                </div>


                <div className="input-group">
                    <label htmlFor="constructionType">Bauweise</label>
                    <select id="constructionType" name="constructionType" required={!project.constructionType}>
                        <option value="">{project.constructionType}</option>
                        <option value="Skelettbauweise">Skelettbauweise</option>
                        <option value="Schottenbauweise">Schottenbauweise</option>
                        <option value="Keine Angabe">Keine Angabe</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="bgf">BGF (qm)</label>
                    <input type="number" id="bgf" name="bgf" defaultValue={project.bgf} required={!project.bgf} />
                </div>

                <div className="input-group">
                    <label htmlFor="nuf">NUF (qm)</label>
                    <input type="number" id="nuf" name="nuf" defaultValue={project.nuf} required={!project.nuf} />
                </div>
                </div>

                <div className='formSection'>

                <div className="input-group">
                    <label htmlFor="client">Bauherr</label>
                    <textarea id="client" name="client" defaultValue={project.client} required={!project.client} />
                </div>

                <div className="input-group">
                    <label htmlFor="descriptionConstruction">Beschreibung Bauweise</label>
                    <textarea id="descriptionConstruction" name="descriptionConstruction" defaultValue={project.descriptionConstruction} required={!project.descriptionConstruction} />
                </div>

                <div className="input-group">
                    <label htmlFor="imageUrl">Enter image URL</label>
                    <input type="url" id="imageUrl" defaultValue={project.imageUrl} name="imageUrl" />
                </div>

                <div className="input-group">
                            <label htmlFor="shopDrawings">Ausführungspläne vorliegend?</label>
                            <select
                                id="shopDrawings"
                                name="shopDrawings"
                                required={!project.shopDrawings}
                            >
                                <option value="">{project.shopDrawings}</option>
                                <option value="Ja">Ja</option>
                                <option value="Nein">Nein</option>
                            </select>
                        </div>

                <div className="input-group">
                    <label htmlFor="structuralCalcs">Statik vorliegend?</label>
                    <select
                        id="structuralCalcs"
                        name="structuralCalcs"
                        required={!project.structuralCalcs}
                    >
                        <option value="">{project.structuralCalcs}</option>
                        <option value="Ja">Ja</option>
                        <option value="Nein">Nein</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="projectPlanning">Objektplanung</label>
                    <textarea id="projectPlanning" name="projectPlanning" defaultValue={project.projectPlanning} required={!project.projectPlanning} />
                </div>

                <div className="input-group">
                    <label htmlFor="structuralPlaning">Tragwerksplanung</label>
                    <textarea id="structuralPlaning" name="structuralPlaning" defaultValue={project.structuralPlaning} required={!project.structuralPlaning} />
                </div>

                <div className="input-group">
                    <label htmlFor="facadePlanning">Fassadenplanung</label>
                    <textarea id="facadePlanning" name="facadePlanning" defaultValue={project.facadePlanning} required={!project.facadePlanning} />
                </div>

                <div className="input-group">
                        <button type="submit">Speichern</button>
                    </div>
                </div>
            </form>
        </div>
    )
}