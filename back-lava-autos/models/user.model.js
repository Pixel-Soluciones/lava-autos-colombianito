import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.database.js';
import BaseModel from './base.model.js';

class User extends BaseModel { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [8, 60]
        }
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    tableName: 'USERS',
    modelName: 'User'
});

export default User;