import Express from 'express'
import { TasksRepository } from './repository/tasks-repository'
import * as bodyParser from 'body-parser'
 

const app = Express()
app.use(bodyParser.json());


app.get('/health', (req, res) => {
    
    res.send('OK')
})


app.post('/tasks', (req, res) => {
    
    try {
        const payload = req.body // TODO validate and serialize
        const useCase = new TasksRepository()

        const createdTask = useCase.create(payload)
        
        res.json({
            data: payload,
            success: true
        })
    } catch {
        res.status(500).json({})
    }
})


app.listen(3000, () => {
    console.log('startd')
})

