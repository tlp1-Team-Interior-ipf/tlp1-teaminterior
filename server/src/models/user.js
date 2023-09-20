import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';



// Database modeling for the User entity
export const UserModel = sequelize.define('User', {
        // Model attributes are defined here
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.INTEGER,
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
        date_birth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        // Other model options go here
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: 'User'
});