import { DataTypes } from "sequelize";
import sequelize from "../database/connection.database.js";
import BaseModel from "./base.model.js";

class Employee extends BaseModel { }

Employee.init({
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
    apellido: {
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
    }
}, {
    sequelize,
    tableName: 'TRABAJADORES',
    modelName: 'Employee'
});

export default Employee;