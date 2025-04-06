import { useElements } from "../../api/elementsApi";
import ElementItem from "./element-item/ElementItem";

export default function ElementsCategory(
    {
        filterParam,
        filterValue
    }
) {
    const { elements } = useElements( { filterParam, filterValue });
    return (
        <section className='elements-category'>
            <h3>{filterValue}</h3>
            <ul>
                {elements.map(item =>
                    <ElementItem
                        key={item._id}
                        id={item._id}
                        profileType={item.element.profileType}
                        projectId={item.projectId}
                        length={item.element.length}
                    // onSend={this.sendToBasket}
                    />
                )}
            </ul>
        </section>
    )
}