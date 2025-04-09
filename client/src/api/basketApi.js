import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const basketUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/baskets`;

export const useGetAllBaskets = () => {
    const { request } = useAuth();
    const [baskets, setBaskets] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        request.get(basketUrl)
            .then((data) => {
                console.log('Baskets received', data);
                setBaskets(data)
            })
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
            elements: {}
        }
        return request.post(basketUrl, basketData);
    }

    return {
        addBasket,
    }
}

export const useGetAllInBasket = () => {
    const { userId, request } = useAuth();
    const [elements, setElements] = useState([]);

    useEffect(() => {
        request.get(`${basketUrl}/${userId}`)
            .then(setElements)
    }, [userId]);

    return {
        elements
    };
}

export const useAddToBasket = () => {
    const { userId, request } = useAuth();

    useEffect(() => {

    })

    const addToBasket = (element) => {
        const elementData = {
            element
        }
        return request.post(`${basketUrl}/${userId}`, elementData) // CHANGE THIS TO BASKETID
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