import { useState } from "react";
import { useAddToBasket } from "../api/basketApi";

export default function useAddToBasketHandler() {
    const { addToBasket } = useAddToBasket();
    const [loadingIds, setLoadingIds] = useState({});

    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    const addToBasketHandler = async (element) => {
        if (!element || !element._id) return;

        const id = element._id;
        setLoadingIds(prev => ({ ...prev, [id]: true }));

        try {
            await addToBasket(element);
            await sleep(500); 
        } finally {
            setLoadingIds(prev => ({ ...prev, [id]: false }));
        }
    };

    const isLoading = (id) => !!loadingIds[id];

    return { addToBasketHandler, isLoading };
}