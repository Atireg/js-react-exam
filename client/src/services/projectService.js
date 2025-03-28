import { request } from "../utils/requester";

const baseUrl = 'http://localhost:3030/jsonstore/projects';

export default {
    getAll(){
        return request('GET', baseUrl);
    },
    add(projectData) {
        return request('POST', baseUrl, projectData);
    }
}