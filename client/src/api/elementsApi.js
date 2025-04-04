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

        console.log(`${baseUrl}?${searchParams.toString()}`);
    
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setElements)

    }, [projectId])

    return {
        elements
    }

}