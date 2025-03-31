import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

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
    }, [projectId]);

    return {
        project,
    }

}

// THIS IS A "ON EVENT" HOOK
export const useAddProject = () => {
    const { request } = useAuth();

    const add = (projectData) => 
        request.post(baseUrl, projectData);

    return {
        add,
    }
}

// THIS IS A "ON EVENT" HOOK
export const useEditProject = () => {
    const { request } = useAuth();

    const edit = (projectId, projectData) =>
        request.put(`${baseUrl}/${projectId}`, {...projectData, _id: projectId});

    return {
        edit
    }
}
// THIS IS A "ON EVENT" HOOK
export const useDeleteGame = () => {
    const { request } = useAuth();

    const remove = (projectId) => {
        request.delete(`${baseUrl}/${projectId}`);
    }

    return {
        remove,
    }
}