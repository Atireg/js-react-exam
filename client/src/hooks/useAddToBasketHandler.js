import { useContext, useState } from "react";
import { useAddToBasket } from "../api/basketApi";
import BasketContext from "../contexts/BasketContext";

export default function useAddToBasketHandler(basketId, updateBasketElements) {
    const { userBasket } = useContext(BasketContext)
    const { addToBasket } = useAddToBasket();
    const [ loadingIds, setLoadingIds] = useState({});
    
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    const addToBasketHandler = async (element) => {
        if (!element || !element._id) return;

        const id = element._id;
        setLoadingIds(prev => ({ ...prev, [id]: true }));

        try {
            await addToBasket(basketId, element);
            const updatedElements = [...userBasket.elements, element];
            updateBasketElements(updatedElements);
            await sleep(500); 
        } finally {
            setLoadingIds(prev => ({ ...prev, [id]: false }));
        }
    };

    const isLoading = (id) => !!loadingIds[id];

    return { addToBasketHandler, isLoading };
}