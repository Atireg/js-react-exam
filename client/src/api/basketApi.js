import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";


const basketUrl = 'http://localhost:3030/data/basket';

export const useGetAllInBasket = () => {
    const { request } = useAuth();

    const [ elements, setElements ] = useState([]);

    useEffect(() => {
        request.get(basketUrl)
            .then(setElements)
    }, []);

    return {
        elements
    };
}

export const useAddToBasket = () => {
    const { request } = useAuth();
    
    const addToBasket = (element) => {
        const elementData = {
            element
        }
        return request.post(basketUrl, elementData)
    }

    return {
        addToBasket
    }
}