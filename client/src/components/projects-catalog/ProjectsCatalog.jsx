import { useEffect, useState } from "react";
import projectService from "../../services/projectService";

export default function ProjectsCatalog() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
            projectService.getAll()
            .then(result => {
                setProjects(result);
                
            })    
            
    }, [])

    console.log(projects);

    return (
        <div className="centered-container">
            <main>
                <h1>We have collected building elements from the following projects: </h1>
                <ul className="gallery">
                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image1.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>

                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image2.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>

                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image3.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>

                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image4.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>


                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image5.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>

                    <li className="gallery-img">
                        <a href="#">
                            <figure>
                                <img src="/images/rock-print/image6.jpg" alt="" />
                                <figcaption>&copy; Image by ...</figcaption>
                            </figure>
                        </a>
                    </li>
                </ul>

                <dialog>
                    <button>Close</button>
                </dialog>
            </main>
        </div>
    )
}