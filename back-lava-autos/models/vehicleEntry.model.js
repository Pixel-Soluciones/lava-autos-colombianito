import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.database.js';
import Vehicle from './vehicle.model.js';

const VehicleEntry = sequelize.define('VehicleEntry', {
    id_ingreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    placa: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    tipo_pago: {
        type: DataTypes.ENUM('efectivo', 'transferencia'),
        allowNull: true,
    },
    estado: {
        type: DataTypes.ENUM('EN PROCESO', 'TERMINADO', 'CANCELADO'),
        defaultValue: 'EN PROCESO',
    }
}, {
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'INGRESO_VEHICULO',
    modelName: 'VehicleEntry',
});

VehicleEntry.belongsTo(Vehicle, {
    foreignKey: 'placa',
    targetKey: 'placa'
});

export default VehicleEntry;