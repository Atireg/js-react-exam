export default function VerticalArrowCell({
    label,
    onClick,
    isOpen,
    rowSpan }) {
    return (
        <td
            className="arrow-cell"
            rowSpan={rowSpan}
            onClick={onClick}
        >
            <div className="vertical-label">
                <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9654;</span>
                <span className="vertical-text">{label}</span>
            </div>
        </td>
    )
};