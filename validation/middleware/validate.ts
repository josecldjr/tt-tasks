import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateBody = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const result = schema.safeParse(req.body);
            if (!result.success) {
                next(result.error);
                return;
            }
            req.body = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const validateParams = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const result = schema.safeParse(req.params);
            if (!result.success) {
                next(result.error);
                return;
            }
            req.params = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const validateQuery = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const result = schema.safeParse(req.query);
            if (!result.success) {
                next(result.error);
                return;
            }
            req.query = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
};
