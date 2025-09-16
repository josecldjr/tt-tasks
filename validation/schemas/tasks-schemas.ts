import { z } from 'zod';

export const taskIdParamSchema = z.object({
    id: z.string().uuid('Invalid task ID format')
});

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required and cannot be empty'),
    description: z.string().optional()
});

export const updateTaskSchema = z.object({
    title: z.string().min(1, 'Title cannot be empty').optional(),
    description: z.string().optional(),
    completed: z.boolean().optional()
}).refine(
    (data) => data.title !== undefined || data.description !== undefined || data.completed !== undefined,
    {
        message: 'At least one field must be provided for update',
        path: ['body']
    }
);

export type TaskIdParam = z.infer<typeof taskIdParamSchema>;
export type CreateTaskDTO = z.infer<typeof createTaskSchema>;
export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;
