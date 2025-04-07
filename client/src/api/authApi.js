import { useContext, useEffect, useRef } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/users`

// THIS IS A "ON EVENT" HOOK
export const useLogin = () => {
    const abortRef = useRef(new AbortController()); // using useRef bcs it does not rerender

    const login = (email, password) => 
        request.post(
            `${baseUrl}/login`,
            { email, password },
            { signal: abortRef.current.signal }
        );

    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, []);

    return {
        login,
    }
};

// THIS IS A "ON EVENT" HOOK
export const useRegister = () => {
    // const abortRef = useRef(new AbortController());

    const  register = (email, password) =>
        request.post(
        `${baseUrl}/register`,
        { email, password },
        // { signal: abortRef.current.signal }
    );

    // useEffect(() => {
    //     const abortController = abortRef.current;

    //     return () => abortController.abort();
    // }, []);

    return {
        register,
    }
};

// THIS IS !!!NOT!!! "ON EVENT" HOOK
export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);
    
    useEffect(() => {
        if (!accessToken){
            return;
        }

        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        }

       request.get(`${baseUrl}/logout`, null,  options)
            .finally(userLogoutHandler());

    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !!accessToken,
    }
}