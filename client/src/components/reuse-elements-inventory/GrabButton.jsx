import { Link } from "react-router-dom";
import { useContext } from "react";
import BasketContext from "../../contexts/BasketContext";
import useAddToBasketHandler from "../../hooks/useAddToBasketHandler";
import useAuth from "../../hooks/useAuth";

// "Greif zu!" button for an element of the project inventory (table and cards)
export default function GrabButton({ item, className = '' }) {
    const { isAuthenticated } = useAuth();
    const { basketId, basketElements, updateBasketElements } = useContext(BasketContext);
    const { addToBasketHandler, isLoading } = useAddToBasketHandler(basketId, updateBasketElements);

    if (item.pending) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <Link to='/login'>
                <button className={`small-button ${className}`}>
                    Einloggen, um zu schnappen!
                </button>
            </Link>
        );
    }

    const isAlreadyInBasket = basketElements.some(el => el._id === item._id);
    const isBusy = isAlreadyInBasket || isLoading(item._id);

    // Store the element itself, without the UI-only fields the inventory adds
    const { author: _author, pending: _pending, ...basketElement } = item;

    return (
        <button
            onClick={() => addToBasketHandler(basketElement)}
            className={`small-button ${className}`}
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
    );
}
