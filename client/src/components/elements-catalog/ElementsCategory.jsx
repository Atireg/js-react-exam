import { useElements } from "../../api/elementsApi";
import ElementItem from "./element-item/ElementItem";

export default function ElementsCategory(
    {
        filterParam,
    }
) {
    const { elements } = useElements({ filterParam: filterParam });

    return (
        <ul>
            <h3>{filterParam}</h3>
            {elements.map(item =>
                <ElementItem
                    key={item._id}
                    id={item._id}
                    profileType={item.element.profileType}
                    projectId={item.projectId}
                    // onSend={this.sendToBasket}
                />
            )}
        </ul>
    )
}