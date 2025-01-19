import express, { response } from 'express'
import cors from 'cors'
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } from './utils/config.js'
import loginRouter from './controllers/login.js'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'
import { info, error } from './utils/logger.js'
import mysql from 'mysql2/promise'

const app = express()

info('Connecting to mysql...')
const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE
})

/* pool.getConnection()
    .then((connection) => {
        info('Connected to MySQL database')
        connection.release()
    })
    .catch((e) => {
        error('Error connecting to MySQL database', e)
    }) */

app.locals.db = pool

app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(express.static('dist/front-lava-autos/browser'))
app.use(express.json())
app.use(requestLogger)

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'dist/front-lava-autos/browser' })
})

app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app