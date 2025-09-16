import { ITask } from "../ITask";
import { UpdateTaskDTO } from "../validation/schemas/tasks-schemas";
import { TasksRepository } from "../repository/tasks-repository";

export class UpdateTaskUseCase {

    constructor(private taskRepo: TasksRepository) {}

    async execute(id: string, input: UpdateTaskDTO): Promise<ITask> {
        return await this.taskRepo.update(id, input);
    }
}
