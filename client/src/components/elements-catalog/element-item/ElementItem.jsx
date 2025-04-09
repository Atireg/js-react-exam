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
    const { addToBasket } = useAddToBasket();
    const [isLoading, setIsLoading] = useState(false);

    const addToBasketHandler = async () => {
        if (!element) return;

        setIsLoading(true);

        try {
            await addToBasket(element)
            await new Promise((resolve) => setTimeout(resolve, 500));
  
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <li className='elements-item'>
            <p><strong>ElementId: #{idSlicer(id)}</strong></p>
            <p>Profil: {profileType}</p>
            <p>Project: {project.name}</p>
            <p>Length: {length}m</p>
            <button
                onClick={addToBasketHandler}
                className="small-button"
                style={{
                    backgroundColor: isLoading ? 'grey' : '#e98166cb',
                    color: 'white',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1
                }}
                disabled={isLoading}
            >
                {isLoading ? 'Adding...' : 'Grab!'}
            </button>
        </li>
    )
}


