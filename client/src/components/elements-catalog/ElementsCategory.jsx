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
            {elements.map(element =>
                <ElementItem
                    key={element._id}
                    id={element._id}
                    content={element.element.material}
                    // onSend={this.sendToBasket}
                />
            )}
        </ul>
    )
}