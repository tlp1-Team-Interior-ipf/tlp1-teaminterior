import { getAllDrivers,
        getDriverById,
        getDriverByEmailAndPassword,
        createDriver,
        updateDriver,
        deleteDriver } from "../services/driverServices.js";
import { createJWT } from "../helpers/jsonwebtoken.js";


// Controller to get all drivers
export const ctrlGetAllDrivers = async (req, res) => {
    try {
        const allDrivers = await getAllDrivers()

        if (!allDrivers) {
             res.status(404)
        };
        res.status(200).json(allDrivers)
    } catch (error) {
        res.status(500).json(error.message)
    }
};


// Controller to get a single driver by ID
export const ctrlGetDriver = async (req, res) => {
    try {
      const driverId = req.params.id;
      const driver = await getDriverById(driverId)
  
      if (!driver) {
         res.status(404)
      }
  
      res.status(200).json(driver)
    } catch (error) {
      res.status(500).json(error.message)
    }
};


// Controller to create a new driver
export const ctrlCreateDriver = async (req, res) => {
    try {
        const driver = await createDriver(req.body)
    
        const token = await createJWT({ driver: driver.id })
    
        res.status(200).json({ message: "Driver created", token })
      } catch (error) {
        res.status(500).json(error.message)
      }
};


// Controller to delete a driver by ID
export const ctrlDeleteDriver = async (req, res) => {
    try {
        const deletedDriver = await deleteDriver(req.params.id);
        
        if (!deletedDriver) {
             res.status(404);
        }
        
        res.status(200).json(deletedDriver);
    } catch (error) {
        res.status(500).json(error.message);
    }
};


// Controller to update a driver's information by ID
export const ctrlUpdateDriver = async (req, res) => {
    try {
      const driverId = req.params.id;
      const updatedDriver = await updateDriver(driverId, req.body);
  
      if (!updatedDriver) {
         res.status(404).json({ error: 'Driver not found' });
      }
  
      res.status(200).json(updatedDriver);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };


// Controller for driver login
export const ctrlLoginDriver = async (req, res) => {
    try {
      const driver = await getDriverByEmailAndPassword(req.body)
  
      if (!driver) {
         res.status(404).json({ error: 'Driver not found' });
      };

      const token = await createJWT({ driver: driver.id })
  
      res.status(200).json(token)
    } catch (error) {
      res.status(500).json(error.message)
    }
};