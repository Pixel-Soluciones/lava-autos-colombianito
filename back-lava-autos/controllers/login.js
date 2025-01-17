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


export default loginRouter