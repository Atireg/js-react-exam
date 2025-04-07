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

    return (
        <li className='elements-item'>
            <p><strong>ElementId: #{idSlicer(id)}</strong></p>
            <p>Profil: {profileType}</p>
            <p>Project: {project.name}</p>
            <p>Length: {length}m</p>
            {/* <button className="grab-button">Grab!</button> */}
        </li>
    )
}

