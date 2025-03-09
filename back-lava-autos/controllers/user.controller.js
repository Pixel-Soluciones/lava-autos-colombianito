import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const getAll = async (req, res) => {
    try {
        const users = await User.findAll(
            { 
                where: { status: 'active' },
                attributes: { exclude: ['password'] }
            }
        );
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const register = async (req, res) => {
    try {
        const { email, password, username } = req.body

        const userExists = await User.findOne({
            where: { email }
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' })
        }
        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hash,
            username
        });

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const userController = {
    register,
    getAll
}