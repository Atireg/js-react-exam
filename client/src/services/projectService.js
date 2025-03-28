const baseUrl = 'http://localhost:3030/jsonstore/projects';

export default {
    async create(projectData) {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });

        const result = await response.json();
        return result;
    }
}