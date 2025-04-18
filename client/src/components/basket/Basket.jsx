import { useEffect, useState } from "react";
import { useGetAllInBasket } from "../../api/basketApi"
import { Link } from "react-router";
import { useUserBasket } from "../../hooks/useUserBasket";
import ElementItem from "../elements-catalog/element-item/ElementItem";

export default function Basket() {
    const { userBasket } = useUserBasket();
    const { elements } = useGetAllInBasket(userBasket?._id);
    // const { deleteFromBasket } = useDeleteFromBasket(userBasket?._id);
    const [elementsInBasket, setElementsInBasket] = useState([]);

    useEffect(() => {
        if (elements) {
            setElementsInBasket(elements);
        }
    }, [elements])

    // const onDeleteHandler = async (elementId) => {
    //     const hasConfirm = confirm(`Are you sure you want to delete Element #${elementId}?`);

    //     if (!hasConfirm) {
    //         return;
    //     }
    //     try {
    //         await deleteFromBasket(elementId);
    //         setElementsInBasket(prev => prev.filter(item => item._id !== elementId));
    //     } catch (err) {
    //         console.error("Error deleting from basket:", err);
    //     }
    // }

    if (!userBasket || elementsInBasket.length === 0) {
        return <p>Loading your basket...</p>;
    }

    const elementsToDisplay = elementsInBasket.elements

    return (
        <div className="centered-container">
            {elementsToDisplay?.length > 0 &&
                <>
                        <h3>You have {elementsToDisplay.length} elements in your basket: </h3>
                        <section className='elements-category'>
                            <ul>
                                {elementsToDisplay.map(item =>
                                    <ElementItem
                                        key={item._id}
                                        id={item._id}
                                        projectId={item.projectId}
                                        material={item.material}
                                        profileType={item.profileType}
                                        profile={item.profile}
                                        length={item.element.length}
                                        condition={item.element.condition}
                                        details={item.element}
                                        tag = 'basket'
                                    />
                                )}
                            </ul>
                        </section>
                </>}
            {elementsToDisplay?.length == 0 &&
                <>
                    <h3>Your basket is empty!</h3>
                    <Link to="/elements">
                        <button>Go grabsome elements! </button>
                    </Link>
                </>
            }
        </div>
    )
}