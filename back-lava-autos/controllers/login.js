import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const loginRouter = Router()

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    response
        .status(200)
        .send({ username, password })
})

loginRouter.get('/', async (request, response) => {
    const [db] = await request.app.locals.db.execute('SELECT NOW() as now')
    response
        .status(200)
        .json(db)
})


export default loginRouter