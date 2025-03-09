import { DataTypes } from "sequelize";
import sequelize from "../database/connection.database.js";

const Service = sequelize.define('Service', {
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
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending'),
        defaultValue: 'active',
    }
}, {
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'SERVICES',
    modelName: 'Service'
});

export default Service;