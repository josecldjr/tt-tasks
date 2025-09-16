import { Request, Response, NextFunction } from 'express';
import { ValidationError, NotFoundError } from '../errors';
import { UnauthorizedError } from '../usecase/login-use-case';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        const details = error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message
        }));
        
        res.status(400).json({ 
            error: 'Validation failed',
            details 
        });
        return;
    }
    
    if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
        return;
    }
    
    if (error instanceof UnauthorizedError) {
        res.status(401).json({ error: error.message });
        return;
    }
    
    if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message });
        return;
    }

    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({ error: 'Endpoint not found' });
};

export const jsonErrorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
        res.status(400).json({ error: 'Invalid JSON' });
        return;
    }
    next(error);
};
