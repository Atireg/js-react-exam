import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/projects`

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
};

// THIS IS A "ON MOUNT" HOOK

export const useLatestProjects = () => {
    const [ latestProjects, setLatestsProjects ] = useState([]);

    const PAGE_SIZE = 3;
    
    useEffect(() => {
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: PAGE_SIZE,
            select: '_id,name,construction,demolition'
        })

        request.get(`${baseUrl}?${searchParams.toString()}`) //TODO Error handling for code: 400 (undefined)
            .then(setLatestsProjects)
    }, [])

    return {
        latestProjects,
    }
}

// THIS IS A "ON EVENT" HOOK
export const useGetOneProject = (projectId) => {
    const [ project, setProject ] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${projectId}`)
            .then(setProject)
    }, [projectId]);

    return {
        project,
    }

};

// THIS IS A "ON EVENT" HOOK
export const useAddProject = () => {
    const { request } = useAuth();

    const add = (projectData) => 
        request.post(baseUrl, projectData);

    return {
        add,
    }
};

// THIS IS A "ON EVENT" HOOK
export const useEditProject = () => {
    const { request } = useAuth();

    const edit = (projectId, projectData) =>
        request.put(`${baseUrl}/${projectId}`, {...projectData, _id: projectId});

    return {
        edit
    }
};

// THIS IS A "ON EVENT" HOOK
export const useDeleteProject = () => {
    const { request } = useAuth();

    const remove = (projectId) => {
        request.delete(`${baseUrl}/${projectId}`);
    }

    return {
        remove,
    }
};

