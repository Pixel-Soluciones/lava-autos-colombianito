import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.database.js';

const User = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending'),
        defaultValue: 'active',
    }
}, {
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'USERS',
    modelName: 'User'
});

export default User;