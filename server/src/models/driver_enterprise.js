import { sequelize } from "../config/db.js";
import { DataTypes } from 'sequelize';
import { DriverModel } from '../models/driver.js';
import { EnterpriseModel } from '../models/enterprise.js';


export const ModelDriverEnterprise = sequelize.define('Driver_Enterprise', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_enterprise: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_driver: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
},
    {
        timestamp: true
    }
);

ModelDriverEnterprise.belongsTo(EnterpriseModel, {
    foreignKey: 'id_enterprise'
});

EnterpriseModel.hasMany(ModelDriverEnterprise, {
    foreignKey: 'id_enterprise'
});


ModelDriverEnterprise.belongsTo(DriverModel, {
    foreignKey: 'id_driver'
});

DriverModel.hasMany(ModelDriverEnterprise, {
    foreignKey: 'id_driver'
});