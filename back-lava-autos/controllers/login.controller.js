import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../utils/config.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({
            username: user.username,
            email: user.email,
        }, process.env.SECRET_KEY,
        { expiresIn: '1h' });

        return res.status(200).json({
            token,
            user: {
                uid: user.uid,
                email: user.email,
                username: user.username,
                role: user.role,
                status: user.status
            },
            expiresIn: '1h', });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginController = {
    login
};