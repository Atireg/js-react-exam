import { useNavigate  } from 'react-router';
import projectService from '../../services/projectService';

export default function ProjectAdd() {
    const navigate = useNavigate();

    const submitAction = async (formData) => {

        const projectData = Object.fromEntries(formData);

        await projectService.add(projectData);

        //TODO try-catch

        navigate('/projects')
        
    };

    return (
        <div className="form-container">
            <h2>Add Project</h2>
            <form id="add" action={submitAction}>
                <div className="input-group">
                    <label htmlFor="name">Project Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="input-group">
                    <label htmlFor="name">Year of Construction</label>
                    <input type="number" id="construction" name="construction" required />
                </div>
                <div className="input-group">
                    <label htmlFor="name">Year of Demolition</label>
                    <input type="number" id="demolition" name="demolition" required />
                </div>
                <div className="input-group">
                    <label htmlFor="name">Description</label>
                    <textarea id="description" name="description" required />
                </div>
                
                <button type="submit">Add</button>
            </form>
        </div>
    )
}