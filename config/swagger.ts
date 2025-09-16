import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { Application } from 'express';

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));

export const setupSwagger = (app: Application): void => {
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocument);
    });

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Tasks API Documentation',
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true
        }
    }));
};
