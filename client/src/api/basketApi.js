import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const basketUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/baskets`;

export const useGetAllBaskets = () => {
    const { request } = useAuth();
    const [baskets, setBaskets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        request.get(basketUrl)
            .then(response => {
                console.log('Received baskets:', response);
                setBaskets(response);
                setError(null);
            })
            .catch((err) => {
                console.error('Failed to fetch baskets:', err);
                setError(err);
                setBaskets(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        baskets,
        loading,
        error
    };
};

export const useAddBasket = () => {
    const { request } = useAuth();
    const [error, setError] = useState(null);

    const addBasket = async () => {
        try {
            const basketData = {
                elements: []
            };
            console.log('Creating new basket with data:', basketData);
            const response = await request.post(basketUrl, basketData);
            console.log('Created basket:', response);
            setError(null);
            return response;
        } catch (err) {
            console.error('Failed to create basket:', err);
            setError(err);
            throw err;
        }
    };

    return {
        addBasket,
        error
    };
};

export const useGetAllInBasket = (basketId) => {
    const { request } = useAuth();
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!basketId) {
            console.log('No basketId provided');
            setLoading(false);
            return;
        }

        console.log('Fetching basket contents for ID:', basketId);
        request.get(`${basketUrl}/${basketId}`)
            .then(response => {
                console.log('Received basket contents:', response);
                setElements(response);
                setError(null);
            })
            .catch((err) => {
                console.error('Failed to fetch elements from basket:', err);
                setError(err);
                setElements([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [basketId]);

    return {
        elements,
        loading,
        error
    };
};

export const useAddToBasket = () => {
    const { request } = useAuth();
    const [error, setError] = useState(null);

    const addToBasket = async (basketId, element) => {
        if (!basketId || !element) {
            console.error('Missing required parameters:', { basketId, element });
            throw new Error('Missing basketId or element');
        }

        try {
            console.log('Fetching current basket data for ID:', basketId);
            const basketData = await request.get(`${basketUrl}/${basketId}`);
            console.log('Current basket data:', basketData);

            const currentElements = basketData.elements || [];
            const exists = currentElements.some(el => el._id === element._id);

            if (exists) {
                console.warn("Element already exists in basket:", element._id);
                return basketData;
            }

            const updatedElements = [...currentElements, element];
            console.log('Updating basket with elements:', updatedElements);

            const response = await request.put(`${basketUrl}/${basketId}`, {
                ...basketData,
                elements: updatedElements
            });

            console.log('Basket update response:', response);
            setError(null);
            return response;
        } catch (error) {
            console.error("Error adding element to basket:", error);
            setError(error);
            throw error;
        }
    };

    return {
        addToBasket,
        error
    };
};

// export const useDeleteBasket = () => {
//     const { request } = useAuth();

//     const deleteFromBasket = (basketId) =>
//         request.get(`${basketUrl}/${basketId}`);

//     return {
//         deleteFromBasket
//     }

// }