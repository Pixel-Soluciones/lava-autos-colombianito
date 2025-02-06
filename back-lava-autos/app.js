import express, { response } from 'express'
import pool from './database/connection.database.js'
import cors from 'cors'
import loginRouter from './routes/login.route.js'
import userRouter from './routes/user.route.js'
import employeesRouter from './routes/employees.route.js'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'
import servicesRouter from './routes/services.route.js'

const app = express()

app.locals.db = pool

app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(express.static('dist/front-lava-autos/browser'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/employees', employeesRouter)
app.use('/api/services', servicesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app