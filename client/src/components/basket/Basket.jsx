import { useEffect, useState } from "react";
import { useGetAllInBasket } from "../../api/basketApi"
import { Link } from "react-router";
import { useUserBasket } from "../../hooks/useUserBasket";
import ElementItem from "../elements-catalog/element-item/ElementItem";

export default function Basket() {
    const { userBasket, error: basketError } = useUserBasket();
    const { elements, loading, error: elementsError } = useGetAllInBasket(userBasket?._id);
    // const { deleteFromBasket } = useDeleteFromBasket(userBasket?._id);
    const [elementsInBasket, setElementsInBasket] = useState([]);

    useEffect(() => {
        if (elements) {
            console.log('Setting basket elements:', elements);
            setElementsInBasket(elements);
        }
    }, [elements]);

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

    if (loading) {
        return <div className="centered-container">Loading your basket...</div>;
    }

    if (basketError) {
        return <div className="centered-container">Error loading your basket: {basketError.message}</div>;
    }

    if (elementsError) {
        return <div className="centered-container">Error loading basket elements: {elementsError.message}</div>;
    }

    if (!userBasket) {
        return <div className="centered-container">No basket found. Please try refreshing the page.</div>;
    }

    const elementsToDisplay = elementsInBasket.elements || [];

    return (
        <div className="centered-container">
            {elementsToDisplay.length > 0 ? (
                <>
                    {/* <h3>You have {elementsToDisplay.length} elements in your basket: </h3> */}
                    <h3>Sie haben {elementsToDisplay.length} Elemente in Ihrem Warenkorb: </h3>
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
                                    tag='basket'
                                />
                            )}
                        </ul>
                    </section>
                </>
            ) : (
                <>
                    <h3>Your basket is empty!</h3>
                    <Link to="/elements">
                        <button>Go grab some elements!</button>
                    </Link>
                </>
            )}
        </div>
    );
}