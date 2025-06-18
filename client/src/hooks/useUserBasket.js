import { useEffect, useState } from "react";
import { useAddBasket, useGetAllBaskets } from "../api/basketApi";
import useAuth from "./useAuth";

export const useUserBasket = () => {
    const { userId } = useAuth();
    const { addBasket, error: addError } = useAddBasket();
    const { baskets, loading, error: fetchError } = useGetAllBaskets(); 
    const [userBasket, setUserBasket] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        if (!userId || loading || (userBasket === null && !Array.isArray(baskets))) {
            return;
        }
  
        const existing = baskets?.find(basket => basket._ownerId === userId);
  
        if (existing) {
            console.log('Found existing basket:', existing);
            setUserBasket(existing);
            setError(null);
        } else {
            console.log('No existing basket found, creating new one');
            const createBasket = async () => {
                try {
                    const newBasket = await addBasket();
                    console.log('Created new basket:', newBasket);
                    setUserBasket(newBasket);
                    setError(null);
                } catch (err) {
                    console.error("Failed to create basket:", err);
                    setError(err);
                }
            };
            createBasket();
        }
    }, [userId, loading, baskets]);

    // Combine errors from different sources
    useEffect(() => {
        if (fetchError) {
            setError(fetchError);
        } else if (addError) {
            setError(addError);
        }
    }, [fetchError, addError]);
  
    return { 
        userBasket,
        loading,
        error
    };
}