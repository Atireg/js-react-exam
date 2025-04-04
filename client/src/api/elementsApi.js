import { useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";

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

// THIS IS A "ON MOUNT" HOOK
export const useGetAllElements = (projectId) => {
    const { request } = useAuth();
    // const [ elements, setElements ] = useState([]);
    const [ elements, dispatch ] = useReducer(elementsReducer, [])

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `projectId="${projectId}"`,
            load: `author=_ownerId:users` // using relations
        });
    
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(result => dispatch({type:'GET_ALL', payload: result}))

    }, [projectId]) //TODO Fix !!!

    return {
        elements,
        addElement: (commentData) => dispatch({type: 'ADD_COMMENT', payload: commentData})
    }

}

// THIS IS A "ON EVENT" HOOK
export const useAddElement = () => {
    const { request } = useAuth();

    const add = (projectId, element) => {
        const elementData = {
            projectId,
            element
        }
        return request.post(baseUrl, elementData);
    }

    return {
        add,
    }
}