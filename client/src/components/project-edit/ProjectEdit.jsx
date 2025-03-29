import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import projectService from "../../services/projectService";

export default function ProjectEdit() {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [project, setProject] = useState({})

    useEffect(() => {
        projectService.getOne(projectId)
            .then(setProject);
    }, [projectId])

    const formAction = async (formData) => {

        const projectData = Object.fromEntries(formData);

        await projectService.edit(projectId, projectData);

        //TODO try-catch

        navigate(`/projects/${projectId}/details`)

    };

    return (
        <div className="centered-container">
            <h2>Edit Project Details</h2>
            <form id="add" action={formAction}>
                <div className="input-group">
                    <label htmlFor="name">Project Name</label>
                    <input type="text" id="name" name="name" defaultValue={project.name} required />
                </div>
                <div className="input-group">
                    <label htmlFor="construction">Year of Construction</label>
                    <input type="number" id="construction" name="construction" defaultValue={project.construction} min="1700" max="2040" required />
                </div>
                <div className="input-group">
                    <label htmlFor="demolition">Year of Demolition</label>
                    <input type="number" id="demolition" name="demolition" defaultValue={project.demolition} min="2000" max="2100" required />
                </div>
                <div className="input-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" defaultValue={project.location} required />
                </div>
                <div className="input-group">
                    <label htmlFor="imageUrl">Enter image URL</label>
                    <input type="url" id="imageUrl" defaultValue={project.imageUrl} name="imageUrl" />
                </div>
                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" defaultValue={project.description} required />
                </div>
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}