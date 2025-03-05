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
    tipo_pago: {
        type: DataTypes.ENUM('efectivo', 'tarjeta'),
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('en_proceso', 'terminado', 'cancelado'),
        defaultValue: 'en_proceso',
    }
}, {
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'INGRESO_VEHICULO',
    modelName: 'VehicleEntry',
});

export default VehicleEntry;