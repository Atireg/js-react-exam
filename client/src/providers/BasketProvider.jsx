import { useEffect, useState } from "react";
import { useAddBasket, useGetAllBaskets } from "../api/basketApi";
import useAuth from "../hooks/useAuth";
import BasketContext from "../contexts/BasketContext";


export const BasketProvider = ({ children }) => {
    const { userId } = useAuth();
    const { addBasket } = useAddBasket();
    const { baskets, loading } = useGetAllBaskets();
    const [userBasket, setUserBasket] = useState(null);
    
    useEffect(() => {
        if (!userId || loading || (userBasket === null && !Array.isArray(baskets))) return;
        
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
      
      // Value to be provided through the context
      const value = {
        userBasket,
        basketId: userBasket?._id || null,
        basketLoading: loading || (!loading && !userBasket),
        basketElements: userBasket?.elements || []
      };
    
    return (
      <BasketContext.Provider value={value}>
        {children}
      </BasketContext.Provider>
    );
  };