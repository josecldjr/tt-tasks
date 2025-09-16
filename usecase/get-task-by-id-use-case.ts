import { ITask } from "../ITask";
import { TasksRepository } from "../repository/tasks-repository";
import { NotFoundError } from "../errors";

export class GetTaskByIdUseCase {

    constructor(private taskRepo: TasksRepository) {}

    async execute(id: string): Promise<ITask> {
        const task = await this.taskRepo.findById(id);
        
        if (!task) {
            throw new NotFoundError(`Task with id ${id} not found`);
        }

        return task;
    }
}
