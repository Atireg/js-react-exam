import { Link } from 'react-router'
import extractYear from '../../../utils/extractYear'

export default function ProjectsCatalogItem({
    _id,
    name,
    construction,
    demolition,
    location,
    imageUrl
}) {

    return (
        <li className="gallery-img">
            <figure>
                <Link to={`/projects/${_id}/details`} className="details">
                    <img src={imageUrl} alt="" />
                </Link>
            </figure>
            <p>{name} ({location})</p>
            <p>{construction} - {extractYear(demolition)}</p>
        </li>
    )
}