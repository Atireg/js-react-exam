const request = async (method, url, data, options = {}) => {
    if (method !== 'GET') {
        options.method = method;
    }

    const authData = JSON.parse(localStorage.getItem('auth') || '{}');
    console.log('Auth data from localStorage:', authData);

    if (authData.sessionId) {
        console.log('Adding auth header with session:', authData.sessionId);
        options = {
            ...options,
            headers: {
                'X-Authorization': authData.sessionId,
                ...options.headers,
            },
        }
    }

    if (data) {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        }
    }

    console.log('Making request:', { method, url, options });

    try {
        const response = await fetch(url, options);
        const responseContentType = response.headers.get('Content-Type');

        if (!responseContentType) {
            return;
        }

        const result = await response.json();

        if (!response.ok) {
            throw {
                message: result.message || 'An error occurred',
                status: response.status
            };
        }

        // Ensure IDs are strings in the response
        const processIds = (obj) => {
            if (!obj) return obj;
            
            if (Array.isArray(obj)) {
                return obj.map(item => processIds(item));
            }
            
            if (typeof obj === 'object') {
                const processed = { ...obj };
                if (obj._id) {
                    processed._id = String(obj._id);
                }
                if (obj._ownerId) {
                    processed._ownerId = String(obj._ownerId);
                }
                if (obj.userId) {
                    processed.userId = String(obj.userId);
                }
                
                // Process nested objects
                for (const key in processed) {
                    if (typeof processed[key] === 'object' && processed[key] !== null) {
                        processed[key] = processIds(processed[key]);
                    }
                }
                
                return processed;
            }
            
            return obj;
        };

        const processedResult = processIds(result);
        console.log('Response:', processedResult);
        return processedResult;
    } catch (error) {
        console.error('Request failed:', { method, url, error });
        throw error;
    }
};

export default request;
