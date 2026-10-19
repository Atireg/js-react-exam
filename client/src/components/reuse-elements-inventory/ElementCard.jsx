import { Link } from "react-router-dom";
import { useContext } from "react";
import idSlicer from "../../utils/idSlicer";
import BasketContext from "../../contexts/BasketContext";
import useAddToBasketHandler from "../../hooks/useAddToBasketHandler";
import useAuth from "../../hooks/useAuth";

// Same groups and labels as the arrow columns in the desktop table
const GROUPS = [
    {
        label: 'Dimensionen',
        fields: [
            ['length', 'Länge (mm)'],
            ['width', 'Breite (mm)'],
            ['height', 'Höhe (mm)'],
            ['tw', 'tw'],
            ['tf', 'tf'],
            ['r', 'r'],
            ['d', 'd'],
            ['diameter', 'Durchmesser'],
            ['t', 't'],
        ],
    },
    {
        label: 'Materialeigenschaften',
        fields: [
            ['specification', 'Werkstoff'],
            ['quality', 'Materialgüte'],
        ],
    },
    {
        label: 'Technische Eigenschaften',
        fields: [
            ['fireProtection', 'Brandschutz'],
            ['fPrThickness', 'Schichtdicke'],
            ['surfaceTreatment', 'Oberflächenbehandlung'],
        ],
    },
    {
        label: 'Bauphysikalische Eigenschaften',
        fields: [
            ['uValue', 'U-Wert'],
            ['humidity', 'Feuchtigkeit'],
            ['soundproofing', 'Schallschutz'],
        ],
    },
    {
        label: 'Bauaufsichtliche Regelung',
        fields: [
            ['nW', 'Verwendbarkeits-NW'],
            ['shopDrawings', 'Ausführungspläne'],
            ['structuralCalcs', 'Bestandstatik'],
        ],
    },
    {
        label: 'Rückbau & ReUse',
        fields: [
            ['dismantlingType', 'Rückbauart'],
            ['effort', 'Aufwand'],
            ['suitableFor', 'Eignung für'],
        ],
    },
];

const SUMMARY_FIELDS = [
    ['loadBearing', 'Tragend'],
    ['material', 'Material'],
    ['function', 'Funktion'],
    ['quantity', 'Menge'],
    ['elementType', 'Art'],
    ['profileType', 'Profilart'],
    ['profile', 'Profil'],
    ['connectionType', 'Verbindung'],
    ['manufacturingYear', 'Herstellungsjahr'],
    ['condition', 'Zustand'],
];

const hasValue = (value) => value !== undefined && value !== null && value !== '';

function PropertyList({ data, fields }) {
    return (
        <dl className="element-card-props">
            {fields.filter(([key]) => hasValue(data[key])).map(([key, label]) => (
                <div key={key}>
                    <dt>{label}</dt>
                    <dd>{data[key]}</dd>
                </div>
            ))}
        </dl>
    );
}

export default function ElementCard({ item, isOwner, onDelete }) {
    const data = item.element || {};
    const { isAuthenticated } = useAuth();
    const { basketId, basketElements, updateBasketElements } = useContext(BasketContext);
    const { addToBasketHandler, isLoading } = useAddToBasketHandler(basketId, updateBasketElements);

    const isAlreadyInBasket = basketElements.some(el => el._id === item._id);
    const isBusy = isAlreadyInBasket || isLoading(item._id);

    // Store the element itself, without the UI-only fields the inventory adds
    const { author: _author, pending: _pending, ...basketElement } = item;

    return (
        <li className="element-card" style={{ color: item.pending ? 'lightgray' : '' }}>
            <p className="elements-individual">
                #{idSlicer(item._id)} {data.member && `· ${data.member}`}
            </p>

            <PropertyList data={data} fields={SUMMARY_FIELDS} />

            {/* Only show groups that have at least one value */}
            {GROUPS.filter(group => group.fields.some(([key]) => hasValue(data[key]))).map(group => (
                <details key={group.label} className="element-card-group">
                    <summary>{group.label}</summary>
                    <PropertyList data={data} fields={group.fields} />
                </details>
            ))}

            {hasValue(data.comment) && (
                <p className="element-card-comment"><strong>Kommentar: </strong>{data.comment}</p>
            )}
            <p className="element-card-author">Hinzugefügt von {item.author?.email || 'Unknown'}</p>

            {!item.pending && (isAuthenticated ? (
                <button
                    onClick={() => addToBasketHandler(basketElement)}
                    className="small-button element-card-grab"
                    style={{
                        backgroundColor: isBusy ? 'grey' : '#e98166cb',
                        color: 'white',
                        cursor: isBusy ? 'not-allowed' : 'pointer',
                        opacity: isBusy ? 0.7 : 1
                    }}
                    disabled={isBusy}
                >
                    {isAlreadyInBasket
                        ? 'Bereits Gegriffen'
                        : isLoading(item._id)
                            ? 'Greifen...'
                            : 'Greif zu!'}
                </button>
            ) : (
                <Link to='/login'>
                    <button className="small-button element-card-grab">
                        Einloggen, um zu schnappen!
                    </button>
                </Link>
            ))}

            {isOwner && (
                <div className="action-buttons">
                    <Link to={`/elements/${item._id}/edit`} className="edit-btn">
                        Edit
                    </Link>
                    <button onClick={onDelete} className="delete-btn">
                        Delete
                    </button>
                </div>
            )}
        </li>
    );
}
