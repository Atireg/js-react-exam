import { useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/data/elements';

function elementsReducer(state, action) {
    switch (action.type) {
        case 'GET_ALL':
            return action.payload;
        case 'ADD_COMMENT':
            return [...state, action.payload]
        default:
            return state;
    }
}

export const useElements = ({ projectId, filterParam, filterValue } = {}) => {
    const { request } = useAuth();
    const [ elements, dispatch ] = useReducer(elementsReducer, []);

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (filterParam) {
            searchParams.set('where', `${filterParam}="${filterValue}"`);
            
        } else if (projectId){
            searchParams.set('where', `projectId="${projectId}"`);
            searchParams.set('load', `author=_ownerId:users`);
        }

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(result => dispatch({ type: 'GET_ALL', payload: result }));

    }, [projectId, filterParam, filterValue]);

    return {
        elements,
        addElement: (elementData) =>
            dispatch({ type: 'ADD_COMMENT', payload: elementData }),
    };
}

// THIS IS A "ON EVENT" HOOK
export const useAddElement = () => {
    const { request } = useAuth();
    
    const add = (projectId, material, profileType, element) => {

        const elementData = {
            projectId,
            material,
            profileType,
            element,
        }

        return request.post(baseUrl, elementData);
    }

    return {
        add,
    }
}



