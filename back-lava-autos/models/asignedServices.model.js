import { DataTypes } from "sequelize";
import sequelize from "../database/connection.database.js";
import VehicleEntry from "./vehicleEntry.model.js";
import Service from "./service.model.js";
import Employee from "./employee.model.js";

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
        allowNull: true,
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

// AsignedServices.belongsTo(VehicleEntry, { foreignKey: 'placa', targetKey: 'placa' });
AsignedServices.belongsTo(Service, { foreignKey: 'id_servicio', targetKey: 'id_servicio' });
// AsignedServices.belongsTo(Employee, { foreignKey: 'id_trabajador', targetKey: 'cedula' });

export default AsignedServices;