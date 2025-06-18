import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/projects`

// THIS IS A "ON MOUNT" HOOK
export const useGetAllProjects = () => {
    const { request } = useAuth();
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
    const { request } = useAuth();
    const [ latestProjects, setLatestsProjects ] = useState([]);

    const PAGE_SIZE = 3;
    
    useEffect(() => {
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: PAGE_SIZE,
            select: '_id,name,construction,demolition'
        })

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setLatestsProjects)
    }, [])

    return {
        latestProjects,
    }
}

// THIS IS A "ON EVENT" HOOK
export const useGetOneProject = (projectId) => {
    const { request } = useAuth();
    const [project, setProject] = useState({ _ownerId: null });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!projectId) {
            setError(new Error('Project ID is required'));
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        
        console.log('Fetching project with ID:', projectId);
        request.get(`${baseUrl}/${projectId}`)
            .then(result => {
                console.log('Received project data:', result);
                if (!result) {
                    throw new Error('Project not found');
                }
                if (!result._ownerId) {
                    console.warn('Project data missing _ownerId:', result);
                }
                setProject(result);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Error fetching project:', err);
                setError(err);
                setProject({ _ownerId: null });
                setIsLoading(false);
            });
    }, [projectId]);

    return {
        project,
        isLoading,
        error
    };
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

