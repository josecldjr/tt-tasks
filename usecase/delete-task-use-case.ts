import { TasksRepository } from "../repository/tasks-repository";

export class DeleteTaskUseCase {

    constructor(private taskRepo: TasksRepository) {}

    async execute(id: string): Promise<void> {
        await this.taskRepo.delete(id);
    }
}
