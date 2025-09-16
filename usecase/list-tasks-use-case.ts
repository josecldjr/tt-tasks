import { ITask } from "../ITask";
import { TasksRepository } from "../repository/tasks-repository";

export class ListTasksUseCase {

    constructor(private taskRepo: TasksRepository) {}

    async execute(): Promise<ITask[]> {
        return await this.taskRepo.findAll();
    }
}
