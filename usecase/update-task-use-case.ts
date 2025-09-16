import { UpdateTaskDTO, ITask } from "../ITask";
import { TasksRepository } from "../repository/tasks-repository";
import { ValidationError } from "../errors";

export class UpdateTaskUseCase {

    constructor(private taskRepo: TasksRepository) {}

    async execute(id: string, input: UpdateTaskDTO): Promise<ITask> {
        if (input.title === undefined && input.description === undefined && input.completed === undefined) {
            throw new ValidationError('At least one field must be provided for update');
        }

        if (input.title !== undefined && input.title.trim() === '') {
            throw new ValidationError('Title cannot be empty');
        }

        return await this.taskRepo.update(id, input);
    }
}
