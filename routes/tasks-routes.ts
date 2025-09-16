import { Router } from 'express';
import { TasksRepository } from '../repository/tasks-repository';
import { CreateTaskUseCase } from '../usecase/create-task-use-case';
import { ListTasksUseCase } from '../usecase/list-tasks-use-case';
import { GetTaskByIdUseCase } from '../usecase/get-task-by-id-use-case';
import { UpdateTaskUseCase } from '../usecase/update-task-use-case';
import { DeleteTaskUseCase } from '../usecase/delete-task-use-case';
import { validateBody, validateParams } from '../validation/middleware/validate';
import { createTaskSchema, updateTaskSchema, taskIdParamSchema } from '../validation/schemas/tasks-schemas';

const router = Router();

const tasksRepository = new TasksRepository();
const createTaskUseCase = new CreateTaskUseCase(tasksRepository);
const listTasksUseCase = new ListTasksUseCase(tasksRepository);
const getTaskByIdUseCase = new GetTaskByIdUseCase(tasksRepository);
const updateTaskUseCase = new UpdateTaskUseCase(tasksRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository);

router.post('/', validateBody(createTaskSchema), async (req, res, next) => {
    try {
        const task = await createTaskUseCase.execute(req.body);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const tasks = await listTasksUseCase.execute();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', validateParams(taskIdParamSchema), async (req, res, next) => {
    try {
        const task = await getTaskByIdUseCase.execute(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', validateParams(taskIdParamSchema), validateBody(updateTaskSchema), async (req, res, next) => {
    try {
        const task = await updateTaskUseCase.execute(req.params.id, req.body);
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', validateParams(taskIdParamSchema), async (req, res, next) => {
    try {
        await deleteTaskUseCase.execute(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
