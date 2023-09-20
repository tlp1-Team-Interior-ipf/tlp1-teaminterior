import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";



// Database modeling for the Enterprise entity
export const EnterpriseModel = sequelize.define('Enterprise', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true,
        },
        social_reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          messge: 'Email already exists'
      },
      },
        CUIT: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    },
    { 
        timestamps: true
    }
);