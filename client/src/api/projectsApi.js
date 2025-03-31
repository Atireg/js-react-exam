import { useContext, useEffect, useState } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/data/projects'

// THIS IS A "ON MOUNT" HOOK
export const useGetAllProjects = () => {
    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setProjects)
    }, [])

    return {
        projects,
    }
}

export const useGetOneProject = (projectId) => {
    const [ project, setProject ] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${projectId}`)
            .then(setProject)
    }, []);

    return {
        project,
    }

}

// THIS IS A "ON EVENT" HOOK
export const useAddProject = () => {
    const { accessToken } = useContext(UserContext);

    const options = {
        headers: {
            'X-Authorization': accessToken,
        }
    }

    const add = (projectData) => 
        request.post(baseUrl, projectData, options);

    return {
        add,
    }
}