import { useContext } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/data/projects'

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