import { useEffect, useState } from "react";
import { useAddBasket, useGetAllBaskets } from "../api/basketApi";
import useAuth from "./useAuth";

export const useUserBasket = () => {
    const { userId } = useAuth();
    const { addBasket } = useAddBasket();
    const { baskets, loading } = useGetAllBaskets(); 
    const [ userBasket, setUserBasket ] = useState(null);
  
    useEffect(() => {
      if (!userId || loading || userBasket === null && !Array.isArray(baskets)) return;
  
      const existing = baskets.find(basket => basket._ownerId === userId);
  
      if (existing) {
        setUserBasket(existing);
      } else {
        const createBasket = async () => {
          try {
            const newBasket = await addBasket();
            setUserBasket(newBasket); 
          } catch (err) {
            console.error("Failed to create basket", err);
          }
        };
        createBasket();
      }
    }, [userId, loading, baskets]);
  
    return { userBasket };
  }