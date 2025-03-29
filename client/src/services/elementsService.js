import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/elements';

export default {
    async getAll(projectId) {
        const elements = await request.get(baseUrl);

        //TODO filter later --> collections
        const projectElements = elements.filter(element => element.projectId !== projectId); //TODO get rid of this

        return projectElements;

    },

    add(user, projectId, element) {
        return request.post(baseUrl, { user, projectId, element })
    }
}