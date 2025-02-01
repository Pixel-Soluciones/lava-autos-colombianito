import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection.database.js";

class BaseModel extends Model {}

BaseModel.init({
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending'),
        defaultValue: 'active',
    }
}, {
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'base_model',
    modelName: 'BaseModel',
});

export default BaseModel;