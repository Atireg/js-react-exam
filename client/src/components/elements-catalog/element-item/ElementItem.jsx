import { useGetOneProject } from "../../../api/projectsApi";
import idSlicer from "../../../utils/idSlicer";
import { useGetOneElement } from "../../../api/elementsApi";
import BasketContext from "../../../contexts/BasketContext";
import useAddToBasketHandler from "../../../hooks/useAddToBasketHandler";
import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

export default function ElementItem(
    {
        id,
        profileType,
        projectId,
        length,
    }
) {
    const { email } = useAuth();
    const { project } = useGetOneProject(projectId);
    const { element } = useGetOneElement(id);
    const { basketId, updateBasketElements } = useContext(BasketContext); 
    const { addToBasketHandler, isLoading } = useAddToBasketHandler(basketId, updateBasketElements);
    
    return (
        <li className='elements-item'>
            <p><strong>ElementId: #{idSlicer(id)}</strong></p>
            <p>Profil: {profileType}</p>
            <p>Project: {project.name}</p>
            <p>Length: {length}m</p>

            {email
            ?
            <button
                onClick={() => addToBasketHandler(element)}
                className="small-button"
                style={{
                    backgroundColor: isLoading(id) ? 'grey' : '#e98166cb',
                    color: 'white',
                    cursor: isLoading(id) ? 'not-allowed' : 'pointer',
                    opacity: isLoading(id) ? 0.7 : 1
                }}
                disabled={isLoading(id)}
            >
                {isLoading(id) ? 'Adding...' : 'Grab!'}
            </button>
            :
            <Link to='/login'>
            <button className="small-button">
                Login to Grab!
            </button>
            </Link>
            }
        </li>
    )
}



