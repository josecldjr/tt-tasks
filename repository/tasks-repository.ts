import { ITask } from "../ITask";
import {randomUUID} from 'crypto'

// in memory database just fot the application test purposes
let tasksStore: ITask[] = []


export type CreateTaskType = {
    name: string
    description: string
}

export class TasksRepository {

    async create({description, name}: CreateTaskType) {
        tasksStore.push({
            id: randomUUID(),
            description,
            name
        })
    }

    async update( data:  Partial<ITask>) {

        if (!data.id) throw 'No Task Id provided'
       
        let updated = false
        for (let i = 0; i < tasksStore.length; i ++) {
            const current = tasksStore[i]
            if (data.id === current.id) {
                tasksStore[i] = {
                    description: data.description ||  current.description,
                    name: data.name || current.name,
                    id: current.id                
                }
            }
        }

    }
}