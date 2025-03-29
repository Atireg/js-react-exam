import { Link } from 'react-router'

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
                    <figcaption>&copy; Image by ...</figcaption>
                </Link>
            </figure>
            <p>{name}</p>
            <p>built: {construction}</p>
            <p>demolished: {demolition}</p>
            <p>located: {location}</p>
        </li>
    )
}