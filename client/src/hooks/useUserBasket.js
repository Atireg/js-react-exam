import { useEffect, useState } from "react";
import { useAddBasket, useGetAllBaskets } from "../api/basketApi";
import useAuth from "./useAuth";

export const useUserBasket = () => {
    const { userId } = useAuth();
    const { addBasket } = useAddBasket();
    const { baskets, loading } = useGetAllBaskets(); 
    const [ userBasket, setUserBasket ] = useState(null);
  
    useEffect(() => {
      // Don't proceed if missing data or we already have a basket
      if (!userId || loading || userBasket === null && !Array.isArray(baskets)) return;
  
      console.log("Fetched baskets", baskets);
  
      const existing = baskets.find(basket => basket._ownerId === userId);
      console.log("Existing basket found?", existing);
  
      if (existing) {
        setUserBasket(existing);
      } else {
        const createBasket = async () => {
          try {
            const newBasket = await addBasket();
            console.log("New basket created:", newBasket);
            setUserBasket(newBasket); // ← set it even if it's not in the original list
          } catch (err) {
            console.error("Failed to create basket", err);
          }
        };
        createBasket();
      }
    }, [userId, loading, baskets]);
  
    return { userBasket };
  }