import ElementItem from "./element-item/ElementItem";

export default function ElementsCategory(
    {
        elements
    }
) {

    return (
        <>
            <ul>
                {elements.map(item =>
                    <ElementItem
                        key={item._id}
                        id={item._id}
                        projectId={item.projectId}
                        material={item.material}
                        profileType={item.profileType}
                        profile={item.profile}
                        length={item.element.length}
                        condition={item.element.condition}
                        details = {item.element}
                    />
                )}
            </ul>
        </>
    )
}