import { ITask } from "../ITask";
import { CreateTaskDTO } from "../validation/schemas/tasks-schemas";
import { TasksRepository } from "../repository/tasks-repository";

export class CreateTaskUseCase {

    constructor(private taskRepo: TasksRepository) {}

    async execute(input: CreateTaskDTO): Promise<ITask> {
        return await this.taskRepo.create(input);
    }
}