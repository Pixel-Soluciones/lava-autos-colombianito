import express, { response } from 'express'
import pool from './database/connection.database.js'
import cors from 'cors'
import loginRouter from './routes/login.route.js'
import userRouter from './routes/user.route.js'
import employeesRouter from './routes/employees.route.js'
import vehiclesRouter from './routes/vehicles.route.js'
import vehicleEntryRouter from './routes/vehicleEntry.route.js'
import asignedServicesRouter from './routes/asignedServices.route.js'
import reportsRouter from './routes/reports.route.js'
import './models/associations.js';
import { requestLogger, unknownEndpoint, errorHandler, userExtractor } from './utils/middleware.js'
import servicesRouter from './routes/services.route.js'

const app = express()

app.locals.db = pool

app.use(cors({
    origin: '*',
    credentials: true
}))
// app.use(express.static('dist/front-lava-autos/browser'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/employees', userExtractor, employeesRouter)
app.use('/api/services', userExtractor, servicesRouter)
app.use('/api/vehicles', userExtractor, vehiclesRouter)
app.use('/api/vehicle-entry', userExtractor, vehicleEntryRouter)
app.use('/api/asigned-services', userExtractor, asignedServicesRouter)
app.use('/api/reports', reportsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app