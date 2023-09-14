import { sequelize } from '../config/db.js';
import { DataTypes, Error } from 'sequelize';
import { hashPassword } from '../helpers/hash.js';
import bcrypt from 'bcrypt';


// Database modeling for the Driver entity
export const DriverModel = sequelize.define('Driver', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
},
{
    timestamps: true
});



// Retrieves all drivers from the database
export async function getAllDrivers() {
    try {
      const drivers = await DriverModel.findAll();
  
      if (!drivers || drivers.length === 0) {
        throw new Error ('No drivers were found in the database.');
      };
  
      return drivers;
    } catch (error) {
        throw new Error (error.mesagge);
    }
};


// Creates a new driver in the database
export async function createDriver(driverToCreate) {
    try {
      const existingDriver = await DriverModel.findOne({ where: { email: driverToCreate.email } });
      if (existingDriver) {
        throw new Error ('Driver already exists');
      };
  
      const hashedPassword = await hashPassword(driverToCreate.password);

      const newDriver = await DriverModel.create({ ...driverToCreate, password: hashedPassword });
      return newDriver;
    } catch (error) {
        throw new Error (error.mesagge);
    }
};


// Retrieves a single driver by ID from the database
export async function getDriverById(driverId) {
    try {
      const driver = await DriverModel.findByPk(driverId);
      if (!driver) {
        throw new Error ('Driver not found');
      }
      return driver;
    } catch (error) {
        throw new Error (error.mesagge);
    }
};


// Deletes a driver from the database
export async function deleteDriver(id) {
    try {
        const updatedCount = await DriverModel.update({ estado: false }, { where: { id } });
        if (updatedCount[0] === 0) {
            throw new Error ('Driver not found for soft deletion');
        };

        return ('Driver soft deleted successfully');
      } catch (error) {
        throw new Error (error.mesagge);
      };
};


// Updates driver information in the database
export async function updateDriver(driverId, updatedDriverData) {
    try {
      if (updatedDriverData.password) {
        const hashedPassword = await hashPassword(updatedDriverData.password);
        updatedDriverData.password = hashedPassword;
      };
  
      const [updatedCount] = await DriverModel.update(updatedDriverData, {
        where: { id: driverId },
      });
  
      if (updatedCount === 0) {
        throw new Error ('Driver not updated');
      };
  
      const updatedDriver = await getUserById(driverId);
  
      return updatedDriver;
    } catch (error) {
      throw new Error (error.mesagge);
    }
};


// Checks if a driver with the given email and password exists in the database
export async function getDriverByEmailAndPassword({ email, password }) {
    try {
      const driver = await DriverModel.findOne({ where: { email } });
  
      if (!driver) {
        throw new Error ('Driver not found');

      }
  
      const isPasswordValid = await bcrypt.compare(password, driver.password);
  
      if (!isPasswordValid) {
        throw new Error ('Incorrect password');
      }
  
      return driver;
    } catch (error) {
      throw new Error (error.mesagge);
    }
};