const { MongoClient, ObjectId } = require('mongodb');
const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

// MongoDB Connection configuration
const uri = process.env.MONGO_DB_STRING;
if (!uri) {
    throw new Error('MONGO_DB_STRING environment variable is not set');
}

const client = new MongoClient(uri);
let database = null;
let isConnected = false;
let dbOps = null;

// Database connection management
async function connectToDatabase() {
    try {
        if (isConnected && dbOps) {
            return database;
        }

        await client.connect();
        console.log('Successfully connected to MongoDB');
        
        database = client.db('khReUse');
        isConnected = true;
        dbOps = new DatabaseOperations(database);

        return database;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        isConnected = false;
        database = null;
        dbOps = null;
        throw error;
    }
}

// Initialize database connection before anything else
async function initializeDatabase() {
    await connectToDatabase();
    
    // Initialize required collections
    await dbOps.ensureCollection('projects');
    await dbOps.ensureCollection('elements');
    await dbOps.ensureCollection('users');
    await dbOps.ensureCollection('sessions');
}

// Helper function to convert MongoDB ObjectId to string
function convertId(doc) {
    if (!doc) return doc;
    
    if (Array.isArray(doc)) {
        return doc.map(item => convertId(item));
    }
    
    if (typeof doc === 'object') {
        const converted = { ...doc };
        if (doc._id) {
            converted._id = doc._id.toString();
        }
        if (doc._ownerId) {
            converted._ownerId = doc._ownerId.toString();
        }
        // Also convert nested objects
        for (const key in converted) {
            if (typeof converted[key] === 'object' && converted[key] !== null) {
                converted[key] = convertId(converted[key]);
            }
        }
        return converted;
    }
    
    return doc;
}

// Helper function to convert string ID to ObjectId for queries
function toObjectId(id) {
    console.log('Converting ID to ObjectId:', id);
    try {
        const objectId = new ObjectId(id);
        console.log('Converted to:', objectId);
        return objectId;
    } catch (error) {
        console.log('Failed to convert ID:', error.message);
        return id; // Return original if not a valid ObjectId
    }
}

// Database Operations Layer
class DatabaseOperations {
    constructor(database) {
        this.database = database;
    }

    async getCollection(collectionName) {
        if (!this.database) {
            throw new Error('Database connection not initialized');
        }
        return this.database.collection(collectionName);
    }

    async ensureCollection(collectionName) {
        const collections = await this.database.listCollections({ name: collectionName }).toArray();
        if (collections.length === 0) {
            await this.database.createCollection(collectionName);
            console.log(`Collection ${collectionName} created`);
        }
        return this.database.collection(collectionName);
    }

    async findOne(collectionName, query) {
        console.log('FindOne Query:', collectionName, JSON.stringify(query));
        const collection = await this.getCollection(collectionName);
        
        // Convert _id and _ownerId to ObjectId if they exist in query
        const processedQuery = { ...query };
        if (query._id) {
            try {
                processedQuery._id = toObjectId(query._id);
                console.log('Converted _id query:', processedQuery);
            } catch (error) {
                console.error('Failed to convert _id:', error);
                return null;
            }
        }
        if (query._ownerId) {
            try {
                processedQuery._ownerId = toObjectId(query._ownerId);
                console.log('Converted _ownerId query:', processedQuery);
            } catch (error) {
                console.error('Failed to convert _ownerId:', error);
                // Don't return null here, just log the error
            }
        }

        const result = await collection.findOne(processedQuery);
        console.log('FindOne Raw Result:', result);
        
        // Ensure _ownerId is properly set in the result
        if (result && result._ownerId) {
            result._ownerId = result._ownerId.toString();
        }
        
        const convertedResult = convertId(result);
        console.log('FindOne Converted Result:', convertedResult);
        return convertedResult;
    }

    async findMany(collectionName, query = {}) {
        console.log('FindMany Query:', collectionName, JSON.stringify(query));
        const collection = await this.getCollection(collectionName);
        
        // Convert _id to ObjectId if it exists in query
        const processedQuery = { ...query };
        if (query._id) {
            try {
                processedQuery._id = toObjectId(query._id);
                console.log('Converted ID query:', processedQuery);
            } catch (error) {
                console.error('Failed to convert ID:', error);
                return [];
            }
        }

        const results = await collection.find(processedQuery).toArray();
        console.log('FindMany Raw Results:', results);
        const convertedResults = convertId(results);
        console.log('FindMany Converted Results:', convertedResults);
        return convertedResults;
    }

    async insertOne(collectionName, document) {
        const collection = await this.getCollection(collectionName);
        const result = await collection.insertOne(document);
        return convertId({ ...document, _id: result.insertedId });
    }

    async updateOne(collectionName, query, update) {
        console.log('UpdateOne Query:', collectionName, JSON.stringify(query));
        const collection = await this.getCollection(collectionName);
        
        // Convert _id to ObjectId if it exists in query
        const processedQuery = { ...query };
        if (query._id) {
            try {
                processedQuery._id = toObjectId(query._id);
                console.log('Converted ID query:', processedQuery);
            } catch (error) {
                console.error('Failed to convert ID:', error);
                return null;
            }
        }

        const result = await collection.updateOne(processedQuery, { $set: update });
        if (result.modifiedCount > 0) {
            const updated = await this.findOne(collectionName, query);
            return updated;
        }
        return null;
    }

    async deleteOne(collectionName, query) {
        console.log('DeleteOne Query:', collectionName, JSON.stringify(query));
        const collection = await this.getCollection(collectionName);
        
        // Convert _id to ObjectId if it exists in query
        const processedQuery = { ...query };
        if (query._id) {
            try {
                processedQuery._id = toObjectId(query._id);
                console.log('Converted ID query:', processedQuery);
            } catch (error) {
                console.error('Failed to convert ID:', error);
                return null;
            }
        }

        const document = await this.findOne(collectionName, query);
        if (!document) return null;
        
        const result = await collection.deleteOne(processedQuery);
        if (result.deletedCount > 0) {
            return convertId(document);
        }
        return null;
    }

    async updateMany(collectionName, query, update) {
        const collection = await this.getCollection(collectionName);
        // Convert _id to ObjectId if it exists in query
        if (query._id) {
            query._id = toObjectId(query._id);
        }
        const result = await collection.updateMany(query, { $set: update });
        return result.modifiedCount;
    }

    async deleteMany(collectionName, query) {
        const collection = await this.getCollection(collectionName);
        // Convert _id to ObjectId if it exists in query
        if (query._id) {
            query._id = toObjectId(query._id);
        }
        const result = await collection.deleteMany(query);
        return result.deletedCount;
    }
}

// Error Classes
class ServiceError extends Error {
    constructor(message = 'Service Error') {
        super(message);
        this.name = 'ServiceError';
    }
}

class NotFoundError extends ServiceError {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}

class RequestError extends ServiceError {
    constructor(message = 'Request error') {
        super(message);
        this.name = 'RequestError';
        this.status = 400;
    }
}

class ConflictError extends ServiceError {
    constructor(message = 'Resource conflict') {
        super(message);
        this.name = 'ConflictError';
        this.status = 409;
    }
}

class AuthorizationError extends ServiceError {
    constructor(message = 'Unauthorized') {
        super(message);
        this.name = 'AuthorizationError';
        this.status = 401;
    }
}

class CredentialError extends ServiceError {
    constructor(message = 'Forbidden') {
        super(message);
        this.name = 'CredentialError';
        this.status = 403;
    }
}

// CRUD Operations
async function get(context, tokens, query, body) {
    validateRequest(context, tokens);

    let responseData;

    try {
        if (query.where) {
            // Convert the where clause to MongoDB query
            const mongoQuery = parseWhereToMongoQuery(query.where);
            responseData = await dbOps.findMany(context.params.collection, mongoQuery);
        } else if (context.params.collection) {
            if (tokens[0]) {
                responseData = await dbOps.findOne(context.params.collection, { _id: tokens[0] });
                if (!responseData) {
                    throw new NotFoundError();
                }
            } else {
                responseData = await dbOps.findMany(context.params.collection, {});
            }
        } else {
            // Get list of collections
            const collections = await database.listCollections().toArray();
            return collections.map(c => c.name);
        }

        // Handle sorting
        if (query.sortBy && Array.isArray(responseData)) {
            const props = query.sortBy
                .split(',')
                .filter(p => p != '')
                .map(p => p.split(' ').filter(p => p != ''))
                .map(([p, desc]) => ({ prop: p, desc: desc ? true : false }));

            for (let i = props.length - 1; i >= 0; i--) {
                let { prop, desc } = props[i];
                responseData.sort(({ [prop]: propA }, { [prop]: propB }) => {
                    if (typeof propA == 'number' && typeof propB == 'number') {
                        return (propA - propB) * (desc ? -1 : 1);
                    } else {
                        return propA.localeCompare(propB) * (desc ? -1 : 1);
                    }
                });
            }
        }

        // Handle pagination
        if (query.offset) {
            responseData = responseData.slice(Number(query.offset) || 0);
        }
        const pageSize = Number(query.pageSize) || 10;
        if (query.pageSize) {
            responseData = responseData.slice(0, pageSize);
        }

        context.canAccess(responseData);
        return responseData;

    } catch (err) {
        console.error(err);
        if (err.message.includes('does not exist')) {
            throw new NotFoundError();
        } else {
            throw new RequestError(err.message);
        }
    }
}

async function post(context, tokens, query, body) {
    validateRequest(context, tokens);
    if (tokens.length > 0) {
        throw new RequestError('Use PUT to update records');
    }
    context.canAccess(undefined, body);

    try {
        console.log('Creating new document in collection:', context.params.collection);
        console.log('User context:', context.user);
        console.log('Request body:', body);

        // Ensure _ownerId is set and is a valid ObjectId
        if (context.user && context.user._id) {
            body._ownerId = toObjectId(context.user._id);
        } else {
            console.error('No user context or user ID for document creation');
            throw new RequestError('User context required');
        }

        body._createdOn = Date.now();
        const responseData = await dbOps.insertOne(context.params.collection, body);
        console.log('Created document:', responseData);
        return responseData;
    } catch (err) {
        console.error('Error creating document:', err);
        throw new RequestError(err.message);
    }
}

async function put(context, tokens, query, body) {
    validateRequest(context, tokens);
    if (tokens.length != 1) {
        throw new RequestError('Missing entry ID');
    }

    try {
        const existing = await dbOps.findOne(context.params.collection, { _id: tokens[0] });
        if (!existing) {
            throw new NotFoundError();
        }

        context.canAccess(existing, body);

        body._updatedOn = Date.now();
        const success = await dbOps.updateOne(context.params.collection, { _id: tokens[0] }, body);
        if (success) {
            return { ...body, _id: tokens[0] };
        } else {
            throw new RequestError();
        }
    } catch (err) {
        throw err;
    }
}

async function del(context, tokens, query, body) {
    validateRequest(context, tokens);
    if (tokens.length != 1) {
        throw new RequestError('Missing entry ID');
    }

    try {
        const existing = await dbOps.findOne(context.params.collection, { _id: tokens[0] });
        if (!existing) {
            throw new NotFoundError();
        }

        context.canAccess(existing);

        const success = await dbOps.deleteOne(context.params.collection, { _id: tokens[0] });
        if (success) {
            return { ...existing, _deletedOn: Date.now() };
        } else {
            throw new RequestError();
        }
    } catch (err) {
        throw err;
    }
}

// Helper function to convert where clause to MongoDB query
function parseWhereToMongoQuery(whereClause) {
    const operators = {
        '<=': (prop, value) => ({ [prop]: { $lte: JSON.parse(value) } }),
        '<': (prop, value) => ({ [prop]: { $lt: JSON.parse(value) } }),
        '>=': (prop, value) => ({ [prop]: { $gte: JSON.parse(value) } }),
        '>': (prop, value) => ({ [prop]: { $gt: JSON.parse(value) } }),
        '=': (prop, value) => ({ [prop]: JSON.parse(value) }),
        ' like ': (prop, value) => ({ [prop]: { $regex: JSON.parse(value), $options: 'i' } }),
        ' in ': (prop, value) => {
            const values = JSON.parse(`[${/\((.+?)\)/.exec(value)[1]}]`);
            return { [prop]: { $in: values } };
        }
    };
    const pattern = new RegExp(`^(.+?)(${Object.keys(operators).join('|')})(.+?)$`, 'i');

    try {
        let clauses = [whereClause.trim()];
        if (whereClause.match(/ and /gi)) {
            clauses = whereClause.split(/ and /gi);
            return { $and: clauses.map(createMongoQuery) };
        } else if (whereClause.match(/ or /gi)) {
            clauses = whereClause.split(/ or /gi);
            return { $or: clauses.map(createMongoQuery) };
        }
        return createMongoQuery(clauses[0]);
    } catch (err) {
        throw new Error('Could not parse WHERE clause, check your syntax.');
    }

    function createMongoQuery(clause) {
        let [match, prop, operator, value] = pattern.exec(clause);
        [prop, value] = [prop.trim(), value.trim()];
        return operators[operator.toLowerCase()](prop, value);
    }
}

// User Authentication Functions
async function registerUser(userData) {
    const users = await dbOps.getCollection('users');
    
    // Check if user exists
    const existing = await users.findOne({ email: userData.email });
    if (existing) {
        throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = crypto.createHash('sha256').update(userData.password).digest('hex');
    
    // Create user
    const user = {
        email: userData.email,
        hashedPassword,
        _createdOn: Date.now()
    };
    
    const result = await users.insertOne(user);
    const newUser = { ...user, _id: result.insertedId };
    delete newUser.hashedPassword;
    
    return newUser;
}

async function loginUser(userData) {
    const users = await dbOps.getCollection('users');
    
    // Find user
    const user = await users.findOne({ email: userData.email });
    if (!user) {
        throw new AuthorizationError('Invalid email or password');
    }

    // Check password
    const hashedPassword = crypto.createHash('sha256').update(userData.password).digest('hex');
    if (hashedPassword !== user.hashedPassword) {
        throw new AuthorizationError('Invalid email or password');
    }

    // Create session
    const session = {
        userId: user._id,
        _createdOn: Date.now()
    };
    
    const sessions = await dbOps.getCollection('sessions');
    const result = await sessions.insertOne(session);
    
    const userWithSession = {
        _id: user._id.toString(),
        email: user.email,
        _createdOn: user._createdOn,
        sessionId: result.insertedId.toString()
    };
    
    return userWithSession;
}

async function logoutUser(sessionId) {
    if (!sessionId) {
        throw new AuthorizationError('No session found');
    }
    
    const sessions = await dbOps.getCollection('sessions');
    await sessions.deleteOne({ _id: sessionId });
}

// Helper function to get user from session
async function getUserFromSession(sessionId) {
    if (!sessionId) {
        console.log('No session ID provided');
        return null;
    }
    
    try {
        const sessions = await dbOps.getCollection('sessions');
        console.log('Looking up session:', sessionId);
        const session = await sessions.findOne({ _id: toObjectId(sessionId) });
        
        if (!session) {
            console.log('No session found for ID:', sessionId);
            return null;
        }
        
        console.log('Found session:', session);
        const users = await dbOps.getCollection('users');
        const user = await users.findOne({ _id: session.userId });
        
        if (!user) {
            console.log('No user found for session:', session);
            return null;
        }
        
        console.log('Found user:', { _id: user._id, email: user.email });
        return {
            _id: user._id.toString(),
            email: user.email
        };
    } catch (error) {
        console.error('Error getting user from session:', error);
        return null;
    }
}

// Helper function to parse query parameters
function parseQueryParams(url) {
    const params = {};
    for (const [key, value] of url.searchParams.entries()) {
        params[key] = value;
    }
    return params;
}

// Validate request helper
function validateRequest(context, tokens) {
    if (context.params.collection == undefined) {
        throw new RequestError('Please, specify collection name');
    }
    
    if (tokens.length > 1) {
        throw new RequestError('Invalid URL');
    }
}

// Context creator
function createContext(req, res) {
    const user = req.user;
    
    const context = {
        params: {},
        user,
        canAccess(resource, data) {
            const userId = user?._id;
            if (!userId) {
                throw new AuthorizationError();
            }
            
            if (resource) {
                if (resource._ownerId !== userId) {
                    throw new CredentialError();
                }
            }
            
            if (data && data._ownerId) {
                if (data._ownerId !== userId) {
                    throw new CredentialError();
                }
            }
        }
    };

    return context;
}

// Initialize database and start server
initializeDatabase().then(() => {
    console.log('Database initialized successfully');
    
    const server = http.createServer(async (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;
        const queryParams = parseQueryParams(url);
        console.log('Request URL:', pathname, 'Query:', queryParams);
        
        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
        
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        
        try {
            // Get user from session if available
            const sessionId = req.headers['x-authorization'];
            console.log('Session ID from request:', sessionId);
            const user = await getUserFromSession(sessionId);
            console.log('User from session:', user);
            
            // Attach user to request
            req.user = user;
            
            // Create context for this request
            const context = createContext(req, res);
            console.log('Created context:', { 
                hasUser: !!context.user,
                userId: context.user?._id
            });

            if (pathname === '/users/register' && req.method === 'POST') {
                let body = '';
                req.on('data', chunk => body += chunk);
                req.on('end', async () => {
                    try {
                        const userData = JSON.parse(body);
                        const result = await registerUser(userData);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(result));
                    } catch (error) {
                        res.writeHead(error.status || 400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    }
                });
            } else if (pathname === '/users/login' && req.method === 'POST') {
                let body = '';
                req.on('data', chunk => body += chunk);
                req.on('end', async () => {
                    try {
                        const userData = JSON.parse(body);
                        const result = await loginUser(userData);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(result));
                    } catch (error) {
                        res.writeHead(error.status || 400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    }
                });
            } else if (pathname === '/users/logout' && req.method === 'GET') {
                try {
                    const sessionId = req.headers['x-authorization'];
                    await logoutUser(sessionId);
                    res.writeHead(204);
                    res.end();
                } catch (error) {
                    res.writeHead(error.status || 400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: error.message }));
                }
            } else if (pathname.startsWith('/data/')) {
                const parts = pathname.split('/').filter(p => p);
                const collection = parts[1];
                const id = parts[2];
                
                // Set collection in context
                context.params.collection = collection;
                console.log('Data request:', { collection, id, queryParams });
                
                if (req.method === 'GET') {
                    let result;
                    if (id) {
                        try {
                            console.log('Finding document by ID:', id);
                            result = await dbOps.findOne(collection, { _id: id });
                            console.log('Found result:', result);
                            if (!result) {
                                console.log('Document not found');
                                res.writeHead(404, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ message: 'Not found' }));
                                return;
                            }
                        } catch (error) {
                            console.error('Error finding document:', error);
                            res.writeHead(404, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Invalid ID format or resource not found' }));
                            return;
                        }
                    } else {
                        // Handle query parameters
                        let query = {};
                        if (queryParams.where) {
                            try {
                                // Parse the where clause
                                const whereValue = queryParams.where.match(/^(\w+)="([^"]*)"$/);
                                if (whereValue) {
                                    const [_, field, value] = whereValue;
                                    // Convert IDs in the query
                                    if (field === '_id' || field === '_ownerId' || field === 'userId') {
                                        query[field] = toObjectId(value);
                                    } else {
                                        query[field] = value;
                                    }
                                }
                            } catch (error) {
                                console.error('Error parsing where clause:', error);
                            }
                        }
                        
                        console.log('Finding documents with query:', query);
                        result = await dbOps.findMany(collection, query);
                    }
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(convertId(result)));
                } else if (req.method === 'POST') {
                    let body = '';
                    req.on('data', chunk => body += chunk);
                    req.on('end', async () => {
                        try {
                            const data = JSON.parse(body);
                            
                            // Ensure user is authenticated
                            if (!context.user) {
                                throw new AuthorizationError('Authentication required');
                            }
                            
                            // Add owner ID
                            data._ownerId = context.user._id;
                            console.log('Creating document with owner:', data._ownerId);
                            
                            const result = await dbOps.insertOne(collection, data);
                            console.log('Created document:', result);
                            
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(convertId(result)));
                        } catch (error) {
                            console.error('Error creating document:', error);
                            res.writeHead(error.status || 400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: error.message }));
                        }
                    });
                } else if (req.method === 'PUT') {
                    if (!id) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'ID is required' }));
                        return;
                    }

                    let body = '';
                    req.on('data', chunk => body += chunk);
                    req.on('end', async () => {
                        try {
                            const data = JSON.parse(body);
                            const result = await dbOps.updateOne(collection, { _id: id }, data);
                            
                            if (!result) {
                                res.writeHead(404, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ message: 'Not found' }));
                                return;
                            }

                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(convertId(result)));
                        } catch (error) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: error.message }));
                        }
                    });
                } else if (req.method === 'DELETE') {
                    if (!id) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'ID is required' }));
                        return;
                    }

                    try {
                        const result = await dbOps.deleteOne(collection, { _id: id });
                        if (!result) {
                            res.writeHead(404, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Not found' }));
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(convertId(result)));
                    } catch (error) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    }
                }
            } else {
                res.writeHead(404);
                res.end('Not found');
            }
        } catch (error) {
            console.error('Error handling request:', error);
            res.writeHead(500);
            res.end('Internal server error');
        }
    });

    const port = process.env.PORT || 3030;
    server.listen(port, () => {
        console.log(`Server started on port ${port}. You can make requests to http://localhost:${port}/`);
    });
}).catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
});

// Graceful shutdown handler
process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing MongoDB connection...');
    if (isConnected) {
        try {
            await client.close();
            console.log('MongoDB connection closed');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
        }
    }
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Closing MongoDB connection...');
    if (isConnected) {
        try {
            await client.close();
            console.log('MongoDB connection closed');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
        }
    }
    process.exit(0);
});
