import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/projects';

export default {
    async getAll(){
        const result = await request.get(baseUrl);
        const projects = Object.values(result);
        return projects;
    },

    add(projectData) {
        return request.post(baseUrl, projectData)
    }
}