import { CreateTaskDTO, ITask } from "../ITask";
import { TasksRepository } from "../repository/tasks-repository";
import { ValidationError } from "../errors";

export class CreateTaskUseCase {

    constructor(private taskRepo: TasksRepository) {}

    async execute(input: CreateTaskDTO): Promise<ITask> {
        if (!input.title || input.title.trim() === '') {
            throw new ValidationError('Title is required and cannot be empty');
        }

        return await this.taskRepo.create(input);
    }
}