import { useEffect, useReducer, useState } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/request";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/elements`;

function elementsReducer(state, action) {
    switch (action.type) {
        case 'GET_ALL':
            return action.payload;
        case 'ADD_ELEMENT':
            return [...state, action.payload]
        default:
            return state;
    }
}

export const useGetElements = ({ projectId, whereString } = {}) => {
    const { request } = useAuth();
    const [elements, dispatch] = useReducer(elementsReducer, []);

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (whereString) {
            searchParams.set('where', whereString);

        } else if (projectId) {
            searchParams.set('where', `projectId="${projectId}"`);
            searchParams.set('load', `author=_ownerId:users`);
        }

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(result => dispatch({ type: 'GET_ALL', payload: result }));

    }, [projectId, whereString]);

    return {
        elements,
        addElement: (elementData) =>
            dispatch({ type: 'ADD_ELEMENT', payload: elementData }),
    };
}

export const useGetOneElement = (elementId) => {
    const [element, setElement] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${elementId}`)
            .then(setElement)
    }, [elementId]);

    return {
        element
    }
}

// THIS IS A "ON EVENT" HOOK
export const useAddElement = () => {
    const { request } = useAuth();

    const add = (
        projectId,
        material,
        elementType,
        profileType,
        profile,
        condition,
        quality,
        specification,
        element
    ) => {

        const elementData = {
            projectId,
            material,
            elementType,
            profileType,
            profile,
            condition,
            quality,
            specification,
            element
        }

        console.log(elementData);


        return request.post(baseUrl, elementData);
    }

    return {
        add,
    }
}



