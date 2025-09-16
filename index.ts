import Express from 'express'
import * as bodyParser from 'body-parser'
import tasksRoutes from './routes/tasks-routes'
import authRoutes from './routes/auth-routes'
import { authenticate } from './auth/auth-middleware'
import { errorHandler, notFoundHandler, jsonErrorHandler } from './middleware/error-handler'
import { setupSwagger } from './config/swagger'
import { API_PREFIX, API_CONFIG } from './config/api'

const app = Express()

app.use(jsonErrorHandler);
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        version: API_CONFIG.version,
        timestamp: new Date().toISOString()
    });
})

setupSwagger(app);

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/tasks`, authenticate, tasksRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(API_CONFIG.port, () => {
    console.log(`Server started on port ${API_CONFIG.port}`);
    console.log(`API Version: ${API_CONFIG.version}`);
    console.log(`API Documentation: http://localhost:${API_CONFIG.port}/docs`);
    console.log(`OpenAPI Spec: http://localhost:${API_CONFIG.port}/api-docs.json`);
})

