// Utility function to handle checkbox group changes
const handleCheckboxChange = (state, setState, fieldName, value) => {
    setState({ ...state, [fieldName]: value });
};

// Reusable component for a checkbox group
export default function CheckboxGroup ({ label, options, selectedOptions, setSelectedOptions }) {
    return (
        <div className="subcategories">
            <h4>{label}</h4>
            {Object.entries(options).map(([key]) => (
                <label className="choice" key={key}>
                    <input
                        type="checkbox"
                        checked={selectedOptions[key]}
                        value={selectedOptions[key]}
                        onChange={(e) => 
                            handleCheckboxChange(
                                selectedOptions,
                                setSelectedOptions,
                                key,
                                e.target.checked
                            )
                        }
                    />
                    <p className="checkbox-mark">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                </label>
            ))}
        </div>
    );
};