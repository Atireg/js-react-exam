import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useAddBasket, useGetAllBaskets } from "../api/basketApi";

export const useUserBasket = () => {
  const { user } = useAuth();
  const { addBasket } = useAddBasket();
  const { baskets } = useGetAllBaskets(); 
  const [userBasket, setUserBasket] = useState(null);

  useEffect(() => {
    if (!user || !baskets || userBasket) return;

    const existing = baskets.find(basket => basket._ownerId === user._id);

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
  }, [user, baskets, userBasket]);

  return { userBasket };
}