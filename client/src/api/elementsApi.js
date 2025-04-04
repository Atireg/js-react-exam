import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/elements';

// THIS IS A "ON MOUNT" HOOK
export const useGetAllElements = (projectId) => {
    const { request } = useAuth();
    const [ elements, setElements ] = useState([]);

    // console.log(request);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `projectId="${projectId}"`
        });
    
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setElements)

    }, [projectId]) //TODO Fix !!!

    return {
        elements
    }

}

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