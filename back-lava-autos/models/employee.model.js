import { DataTypes } from "sequelize";
import sequelize from "../database/connection.database.js";

const Employee = sequelize.define('Employee', {
    cedula: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    contacto: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    porcentaje_servicio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending'),
        defaultValue: 'active',
    }
}, {
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'TRABAJADORES',
    modelName: 'Employee'
});

export default Employee;