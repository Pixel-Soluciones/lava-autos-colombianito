import { DataTypes } from "sequelize";
import sequelize from "../database/connection.database.js";

const Vehicle = sequelize.define("Vehicle", {
  placa: {
    type: DataTypes.STRING(6),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linea: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre_prop: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contacto: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'pending'),
    defaultValue: 'active',
    }
}, {
  sequelize,
  timestamps: true,
  paranoid: true,
  tableName: "VEHICULOS",
  modelName: "Vehicle",
});

export default Vehicle;