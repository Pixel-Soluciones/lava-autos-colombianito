import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3000
export const SECRET_KEY = process.env.SECRET_KEY

export const MYSQL_HOST = process.env.MYSQL_HOST
export const MYSQL_USER = process.env.MYSQL_USER
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE
export const MYSQL_PORT = process.env.MYSQL_PORT

