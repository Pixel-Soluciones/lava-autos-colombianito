import { DataTypes } from "sequelize";
import sequelize from "../database/connection.database.js";

const AsignedServices = sequelize.define('AsignedServices', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    placa: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },
    id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_trabajador: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending'), // active, inactive, pending
        defaultValue: 'active'
    }
}, {
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: "SERVICIOS_ASIGNADOS",
    modelName: "AsignedServices",
});

export default AsignedServices;