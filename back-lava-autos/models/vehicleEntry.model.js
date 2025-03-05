import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.database.js';

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
    id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cedula: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    tipo_pago: {
        type: DataTypes.ENUM('efectivo', 'tarjeta'),
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('en_proceso', 'terminado', 'cancelado'),
        defaultValue: 'en_proceso',
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending'),
        defaultValue: 'active',
    }
}, {
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'INGRESO_VEHICULO',
    modelName: 'VehicleEntry',
});

export default VehicleEntry;