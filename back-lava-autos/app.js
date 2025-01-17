import express from 'express'
import cors from 'cors'
import { DB_URI } from './utils/config.js'
import loginRouter from './controllers/login.js'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'
import { info} from './utils/logger.js'

const app = express()

info('Connecting to', DB_URI)

app.use(cors())
app.use(express.static('dist/front-lava-autos'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app