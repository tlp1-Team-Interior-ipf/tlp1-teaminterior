import { Router } from "express";
import { ctrlCreateDriver,
        ctrlGetAllDrivers,
        ctrlGetDriver,
        ctrlLoginDriver,
        ctrlUpdateDriver,
        ctrlDeleteDriver } from "../controllers/driver.controller.js";
import { createDriverSchema, loginDriverSchema } from "../models/Schema/driver.Schema.js";
import { validator } from "../middlewares/validator.js";

const driverRouter = Router();

// Route to get all drivers
driverRouter.get('/', ctrlGetAllDrivers);

// Route to get a driver by ID
driverRouter.get('/:id', ctrlGetDriver);

// Route to register a new driver, with validation middleware
driverRouter.post('/register', createDriverSchema, validator, ctrlCreateDriver);

// Route to login a driver, with validation middleware
driverRouter.post('/login', loginDriverSchema, validator, ctrlLoginDriver);

// Route to update an existing driver by ID
driverRouter.put('/:id', ctrlUpdateDriver);

// Route to delete a driver by ID
driverRouter.delete('/:id', ctrlDeleteDriver);

export { driverRouter };