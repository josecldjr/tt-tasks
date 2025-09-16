import Express from 'express'
import * as bodyParser from 'body-parser'
import tasksRoutes from './routes/tasks-routes'

const app = Express()
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.send('OK')
})

app.use('/api/v1/tasks', tasksRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000')
})

