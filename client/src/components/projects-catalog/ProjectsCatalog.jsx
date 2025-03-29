import { useEffect, useState } from "react";
import projectService from "../../services/projectService";
import ProjectsCatalogItem from "./project-catalog-item/ProjectsCatalogItem";

export default function ProjectsCatalog() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
            projectService.getAll()
            .then(result => {
                setProjects(result);
                
            })    
            
    }, [])

    // console.log(projects);

    return (
        <div className="centered-container">
            <main>

                <h2>We have collected building elements from the following projects: </h2>
                <ul className="gallery">
                    {projects.map(project => <ProjectsCatalogItem key={project._id} {...project}/>)}  
                </ul>

                {projects.length === 0 && <h2 className="no-items">No projects yet</h2>}       
            </main>
        </div>
    )
}