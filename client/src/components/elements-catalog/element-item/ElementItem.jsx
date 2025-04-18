import { useGetOneProject } from "../../../api/projectsApi";
import idSlicer from "../../../utils/idSlicer";
import { useGetOneElement } from "../../../api/elementsApi";
import BasketContext from "../../../contexts/BasketContext";
import useAddToBasketHandler from "../../../hooks/useAddToBasketHandler";
import { useContext, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

export default function ElementItem(
    {
        id,
        projectId,
        material,
        profileType,
        profile,
        length,
        condition,
        details,
        tag
    }
) {
    const { email } = useAuth();
    const { project } = useGetOneProject(projectId);
    const { element } = useGetOneElement(id);
    const { basketId, basketElements, updateBasketElements } = useContext(BasketContext);
    const { addToBasketHandler, isLoading } = useAddToBasketHandler(basketId, updateBasketElements);
    const [isHovered, setIsHovered] = useState(false);

    const isAlreadyInBasket = basketElements.some(
        (el) => el._id === element._id
    );

    return (
        <li
            className='elements-item'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ position: 'relative' }}
        >
            <p className="elements-individual">ElementId: #{idSlicer(id)}</p>
            <p className="element-property">
                {/* <span className="centered-arrow">&#9654;</span> */}
                <strong>Project: </strong>
                {/* <br /> */}
                {project.name}
            </p>
            <p className="element-property">
                {/* <span className="centered-arrow">&#9654;</span> */}
                <strong>Profilart: </strong>
                {/* <br /> */}
                {profileType}
            </p>
            <p className="element-property">
                {/* <span className="centered-arrow">&#9654;</span> */}
                <strong>Profil: </strong>
                {/* <br /> */}
                {profile}
            </p>
            <p className="element-property">
                {/* <span className="centered-arrow">&#9654;</span> */}
                <strong>Material: </strong>
                {/* <br /> */}
                {material}
            </p>
            <p className="element-property">
                {/* <span className="centered-arrow">&#9654;</span> */}
                <strong>Zustand: </strong>
                {/* <br /> */}
                {condition}
            </p>
            <p className="element-property">
                {/* <span className="centered-arrow">&#9654;</span> */}
                <strong>Length: </strong>
                {/* <br /> */}
                {length}mm
            </p>

            {isHovered && (
                <div className="hover-modal">
                    <p><strong>Tragend: </strong>{details.loadBearing}</p>
                    <p><strong>Bauteil: </strong>{details.member}</p>
                    <p><strong>Funktion: </strong>{details.function}</p>
                    <p><strong>Menge: </strong>{details.quantity}</p>
                    <p><strong>Verbindung: </strong>{details.connectionType}</p>
                    <p><strong>Herstellungsjahr: </strong>{details.manufacturingYear}</p>
                    <p><strong>Materialgüte: </strong>{details.quality}</p>
                    <p><strong>Brandschutz: </strong> {details.fireProtection} / {details.fPrThickness}mm</p>
                    <p><strong>Verwendbarkeits-NW: </strong>{details.nW}</p>
                    <p><strong>Ausführungspläne: </strong>{details.shopDrawings}</p>
                    <p><strong>Bestandsstatik: </strong>{details.structuralCalcs}</p>
                    <p><strong>Rückbauart: </strong>{details.dismantlingType}</p>
                    <p><strong>Aufwand: </strong>{details.effort}</p>
                    <p><strong>Eignung für: </strong>{details.suitableFor}</p>
                </div>
            )}

            {tag === 'elementsCatalog' && 
            <>
            {email
                ?
                <button
                    onClick={() => addToBasketHandler(element)}
                    className="small-button"
                    style={{
                        backgroundColor: isAlreadyInBasket || isLoading(id) ? 'grey' : '#e98166cb',
                        color: 'white',
                        cursor: isAlreadyInBasket || isLoading(id) ? 'not-allowed' : 'pointer',
                        opacity: isAlreadyInBasket || isLoading(id) ? 0.7 : 1
                    }}
                    disabled={isAlreadyInBasket || isLoading(id)}
                >
                    {isAlreadyInBasket
                        ? 'Bereits Gegriffen'
                        : isLoading(id)
                            ? 'Greifen...'
                            : 'Greif zu!'}
                </button>
                :
                <Link to='/login'>
                    <button className="small-button">
                        Login to Grab!
                    </button>
                </Link>
            }
            </>}
        </li>
    )
}



