import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import request from "../utils/request";

export default function useAuth() {
    const authData = useContext(UserContext);

    const requestWrapper = (method, url, data, options = {}) => {
        // Ensure we have a valid auth token
        if (!authData.sessionId) {
            console.warn('No auth token available for request');
            return request(method, url, data, options);
        }

        console.log('Making authenticated request with session:', authData.sessionId);
        const authOptions = {
            ...options,
            headers: {
                'X-Authorization': String(authData.sessionId),
                ...options.headers
            }
        };

        return request(method, url, data, authOptions);
    };

    return {
        ...authData,
        userId: authData._id ? String(authData._id) : '',
        isAuthenticated: !!authData.sessionId,
        request: {
            get: requestWrapper.bind(null, 'GET'),
            post: requestWrapper.bind(null, 'POST'),
            put: requestWrapper.bind(null, 'PUT'),
            delete: requestWrapper.bind(null, 'DELETE'),
        }
    }
};
