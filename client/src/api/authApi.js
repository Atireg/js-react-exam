import { useContext, useEffect, useRef } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/users`

// THIS IS A "ON EVENT" HOOK
export const useLogin = () => {
    const abortRef = useRef(new AbortController());

    const login = async (email, password) => {
        try {
            console.log('Attempting login for:', email);
            const result = await request(
                'POST',
                `${baseUrl}/login`,
                { email, password },
                { signal: abortRef.current.signal }
            );
            console.log('Login successful:', result);
            return result;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

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
    const register = async (email, password) => {
        try {
            console.log('Attempting registration for:', email);
            const result = await request(
                'POST',
                `${baseUrl}/register`,
                { email, password }
            );
            console.log('Registration successful:', result);
            return result;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    return {
        register,
    }
};

// THIS IS !!!NOT!!! "ON EVENT" HOOK
export const useLogout = () => {
    const { sessionId, userLogoutHandler } = useContext(UserContext);
    
    useEffect(() => {
        if (!sessionId) {
            return;
        }

        const options = {
            headers: {
                'X-Authorization': sessionId,
            }
        }

        request('GET', `${baseUrl}/logout`, null, options)
            .then(() => {
                console.log('Logout successful');
                userLogoutHandler();
            })
            .catch(error => {
                console.error('Logout failed:', error);
                // Still logout on client side even if server request fails
                userLogoutHandler();
            });

    }, [sessionId, userLogoutHandler]);

    return {
        isLoggedOut: !!sessionId,
    }
};