import { info, error } from './logger.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { SECRET_KEY } from "../utils/config.js";

const tokenExtractor = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

export const userExtractor = async (request, response, next) => {
    try {
        const token = tokenExtractor(request)
        const decodedToken = jwt.verify(token, SECRET_KEY)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        request.user = await User.findByPk(decodedToken.id)    
    } catch (error) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    next()
}

export const requestLogger = (request, response, next) => {
    info('Method:', request.method)
    info('Path:  ', request.path)
    info('Body:  ', request.body)
    info('---')
    next()
}

export const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (error, request, response, next) => {
    error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}