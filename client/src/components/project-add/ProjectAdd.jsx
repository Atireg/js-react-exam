import { useNavigate  } from 'react-router';
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
            <h2>Add Project</h2>
            <form id="add" action={submitAction}>
                <div className="input-group">
                    <label htmlFor="name">Project Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="input-group">
                    <label htmlFor="construction">Year of Construction</label>
                    <input type="number" id="construction" name="construction" min="1700" max="2040" required />
                </div>
                <div className="input-group">
                    <label htmlFor="demolition">Year of Demolition</label>
                    <input type="number" id="demolition" name="demolition" min="2000" max="2100" required />
                </div>
                <div className="input-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" required />
                </div>
                <div className="input-group">
                    <label htmlFor="imageUrl">Enter image URL</label>
                    <input type="url" id="imageUrl" name="imageUrl" />
                </div>
                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" required />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}