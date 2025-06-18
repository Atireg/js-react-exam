import { useEffect, useReducer, useState } from "react";
import baseRequest from "../utils/request";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/elements`;

function elementsReducer(state, action) {
    switch (action.type) {
        case 'GET_ALL':
            return action.payload;
        case 'ADD_ELEMENT':
            return [...state, action.payload];
        case 'REMOVE_ELEMENT':
            return state.filter(element => element._id !== action.payload);
        default:
            return state;
    }
}

export const useGetElements = ({ projectId, whereString } = {}) => {
    const [elements, dispatch] = useReducer(elementsReducer, []);

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (whereString) {
            searchParams.set('where', whereString);
        } else if (projectId) {
            searchParams.set('where', `projectId="${projectId}"`);
        }

        baseRequest('GET', `${baseUrl}?${searchParams.toString()}`)
            .then(result => dispatch({ type: 'GET_ALL', payload: result }));

    }, [projectId, whereString]);

    return {
        elements,
        addElement: (elementData) =>
            dispatch({ type: 'ADD_ELEMENT', payload: elementData }),
        removeElement: (elementId) =>
            dispatch({ type: 'REMOVE_ELEMENT', payload: elementId }),
    };
}

export const useGetOneElement = (elementId) => {
    const [element, setElement] = useState({});

    useEffect(() => {
        baseRequest('GET', `${baseUrl}/${elementId}`)
            .then(setElement)
    }, [elementId]);

    return {
        element
    }
}

// THIS IS A "ON EVENT" HOOK
export const useAddElement = () => {
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

        return baseRequest('POST', baseUrl, elementData);
    }

    return {
        add,
    }
}

export const useDeleteElement = () => {
    const deleteElement = async (elementId) => {
        try {
            await baseRequest('DELETE', `${baseUrl}/${elementId}`);
            return true;
        } catch (error) {
            console.error('Failed to delete element:', error);
            throw error;
        }
    };

    return {
        deleteElement,
    };
};

export const useEditElement = () => {
    const editElement = async (elementId, elementData) => {
        try {
            const result = await baseRequest('PUT', `${baseUrl}/${elementId}`, elementData);
            return result;
        } catch (error) {
            console.error('Failed to edit element:', error);
            throw error;
        }
    };

    return {
        editElement,
    };
};



