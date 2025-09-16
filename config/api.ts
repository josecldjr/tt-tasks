export const API_VERSION = process.env.API_VERSION || 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

export const API_CONFIG = {
    version: API_VERSION,
    prefix: API_PREFIX,
    port: process.env.PORT || 3000,
    title: 'Tasks API',
    description: 'A simple RESTful API for managing tasks with JWT authentication'
};
