import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const basketUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/baskets`;

export const useGetAllBaskets = () => {
    const { request } = useAuth();
    const [baskets, setBaskets] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        request.get(basketUrl)
            .then(setBaskets)
            .catch((err) => {
                console.error('Failed to fetch', err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return {
        baskets,
        loading
    }
}

export const useAddBasket = () => {
    const { request } = useAuth();

    const addBasket = () => {
        const basketData = {
            elements: []
        }
        return request.post(basketUrl, basketData);
    }

    return {
        addBasket,
    }
}

export const useGetAllInBasket = (basketId) => {
    const { request } = useAuth();
    const [ elements, setElements ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if(!basketId) return;

        request.get(`${basketUrl}/${basketId}`)
            .then(setElements)
            .catch((err) => {
                console.log('Failed to fetch elements from basket', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [basketId]);

    return {
        elements,
        loading
    };
}

export const useAddToBasket = () => {
    const { request } = useAuth();

    const addToBasket = async (element) => {
        try {
            const basketId = "bf5e45cf-3739-4e90-9703-0f1d9dfcccf6"; //TODO Fix this to get dynamically
            const basketData = await request.get(`${basketUrl}/${basketId}`);

            const currentElements = basketData.elements || [];
            
            const updatedElements = [...currentElements, element]

            const response = await request.put(`${basketUrl}/${basketId}`, {
                ...basketData, 
                elements: updatedElements
            })

            return response.data;
        } catch (error) {
            console.error("Error adding element to basket", error);
            throw error;
        }
    }

    return {
        addToBasket
    }
}

export const useDeleteFromBasket = () => {
    const { request } = useAuth();

    const deleteFromBasket = (elementId) =>
        request.delete(`${basketUrl}/${elementId}`);

    return {
        deleteFromBasket
    }

}