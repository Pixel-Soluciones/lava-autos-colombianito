import { DataTypes } from "sequelize";
import sequelize from "../database/connection.database.js";
import BaseModel from "./base.model.js";

class Service extends BaseModel { }

Service.init({
    id_servicio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_servicio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descrip_servicio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tiempo_estimado: {
        type: DataTypes.TIME,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'SERVICES',
    modelName: 'Service'
});

export default Service;