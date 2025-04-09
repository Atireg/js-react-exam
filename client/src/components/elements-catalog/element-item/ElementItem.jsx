import { useGetOneProject } from "../../../api/projectsApi";
import idSlicer from "../../../utils/idSlicer";
import useAddToBasketHandler from "../../../hooks/useAddToBasketHandler";
import { useGetOneElement } from "../../../api/elementsApi";

export default function ElementItem(
    {
        id,
        profileType,
        projectId,
        length,
    }
) {
    const { project } = useGetOneProject(projectId);
    const { addToBasketHandler, isLoading } = useAddToBasketHandler();
    const { element } = useGetOneElement(id);

    return (
        <li className='elements-item'>
            <p><strong>ElementId: #{idSlicer(id)}</strong></p>
            <p>Profil: {profileType}</p>
            <p>Project: {project.name}</p>
            <p>Length: {length}m</p>
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
        </li>
    )
}


