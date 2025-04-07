import { useState } from "react";
import { useAddToBasket } from "../../../api/basketApi";
import { useGetOneElement } from "../../../api/elementsApi";
import { useGetOneProject } from "../../../api/projectsApi";
import idSlicer from "../../../utils/idSlicer";

export default function ElementItem(
    {
        id,
        profileType,
        projectId,
        length,
    
    }
) {

    const { project } = useGetOneProject(projectId);
    const { element } = useGetOneElement(id);
    const [ elementForBasket, setElementForBasket ] = useState({});
    const { addToBasket } = useAddToBasket();


    const getElementIdHandler = () => {
        setElementForBasket(element);
    };

    if (Object.keys(elementForBasket).length !== 0) { //TODO Add a check if the element is already there
        addToBasket(elementForBasket);
    };

    return (
        <li className='elements-item'>
            <p><strong>ElementId: #{idSlicer(id)}</strong></p>
            <p>Profil: {profileType}</p>
            <p>Project: {project.name}</p>
            <p>Length: {length}m</p>
            <button onClick={() => getElementIdHandler(id)} className="small-button">Grab!</button>
        </li>
    )
}

