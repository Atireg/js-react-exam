import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/projects';

export default {
    async getAll() {
        const result = await request.get(baseUrl);
        const projects = Object.values(result);
        return projects;
    },

    getOne(projectId) {
        return request.get(`${baseUrl}/${projectId}`);
    },

    
    add(projectData) {
        return request.post(baseUrl, projectData);
    },

    edit(projectId, projectData) {
        return request.put(`${baseUrl}/${projectId}`, {...projectData, _id: projectId});
    },

    delete(projectId) {
        return request.delete((`${baseUrl}/${projectId}`));
    }
}