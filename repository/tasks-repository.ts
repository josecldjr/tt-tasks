import { ITask } from "../ITask";
import { CreateTaskDTO, UpdateTaskDTO } from "../validation/schemas/tasks-schemas";
import { randomUUID } from 'crypto';
import { NotFoundError } from "../errors";

let tasksStore: ITask[] = [];

export class TasksRepository {

    async create(data: CreateTaskDTO): Promise<ITask> {
        const newTask: ITask = {
            id: randomUUID(),
            title: data.title,
            description: data.description || '',
            completed: false
        };
        
        tasksStore.push(newTask);
        return newTask;
    }

    async findAll(): Promise<ITask[]> {
        return [...tasksStore];
    }

    async findById(id: string): Promise<ITask | null> {
        const task = tasksStore.find(task => task.id === id);
        return task || null;
    }

    async update(id: string, data: UpdateTaskDTO): Promise<ITask> {
        const taskIndex = tasksStore.findIndex(task => task.id === id);
        
        if (taskIndex === -1) {
            throw new NotFoundError(`Task with id ${id} not found`);
        }

        const currentTask = tasksStore[taskIndex];
        const updatedTask: ITask = {
            ...currentTask,
            title: data.title !== undefined ? data.title : currentTask.title,
            description: data.description !== undefined ? data.description : currentTask.description,
            completed: data.completed !== undefined ? data.completed : currentTask.completed
        };

        tasksStore[taskIndex] = updatedTask;
        return updatedTask;
    }

    async delete(id: string): Promise<void> {
        const taskIndex = tasksStore.findIndex(task => task.id === id);
        
        if (taskIndex === -1) {
            throw new NotFoundError(`Task with id ${id} not found`);
        }

        tasksStore.splice(taskIndex, 1);
    }
}