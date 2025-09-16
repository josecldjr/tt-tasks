import { CreateTaskType, TasksRepository } from "../repository/tasks-repository";


export class CreateTaskUseCase  {

    constructor (private taskRepo: TasksRepository) {}

    async execute(input: CreateTaskType) {
        this.taskRepo.create(input)
    }
}