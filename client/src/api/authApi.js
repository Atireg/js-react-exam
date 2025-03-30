import { useEffect, useRef } from "react";
import request from "../utils/request";

const baseUrl = 'http://localhost:3030/users'


// THIS IS A "ON EVENT" HOOK
export const useLogin = () => {
    const abortRef = useRef(new AbortController());

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
    const abortRef = useRef(new AbortController());

    const  register = (email, password) =>
        request.post(
        `${baseUrl}/register`,
        { email, password },
        { signal: abortRef.current.signal }
    );

    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, []);

    return {
        register,
    }
}