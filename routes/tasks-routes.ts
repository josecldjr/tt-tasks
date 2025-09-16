import { Router } from 'express';
import { TasksRepository } from '../repository/tasks-repository';
import { CreateTaskUseCase } from '../usecase/create-task-use-case';
import { ListTasksUseCase } from '../usecase/list-tasks-use-case';
import { GetTaskByIdUseCase } from '../usecase/get-task-by-id-use-case';
import { UpdateTaskUseCase } from '../usecase/update-task-use-case';
import { DeleteTaskUseCase } from '../usecase/delete-task-use-case';
import { ValidationError, NotFoundError } from '../errors';

const router = Router();

const tasksRepository = new TasksRepository();
const createTaskUseCase = new CreateTaskUseCase(tasksRepository);
const listTasksUseCase = new ListTasksUseCase(tasksRepository);
const getTaskByIdUseCase = new GetTaskByIdUseCase(tasksRepository);
const updateTaskUseCase = new UpdateTaskUseCase(tasksRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository);

const handleError = (error: any, res: any): void => {
    if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
    } else if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message });
    } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

router.post('/', async (req, res) => {
    try {
        const task = await createTaskUseCase.execute(req.body);
        res.status(201).json(task);
    } catch (error) {
        handleError(error, res);
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await listTasksUseCase.execute();
        res.status(200).json(tasks);
    } catch (error) {
        handleError(error, res);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await getTaskByIdUseCase.execute(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        handleError(error, res);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const task = await updateTaskUseCase.execute(req.params.id, req.body);
        res.status(200).json(task);
    } catch (error) {
        handleError(error, res);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await deleteTaskUseCase.execute(req.params.id);
        res.status(204).send();
    } catch (error) {
        handleError(error, res);
    }
});

export default router;
