import { Router } from "express";
import { ctrlCreateEnterprise,
        ctrlGetAllEnterprise,
        ctrlGetEnterprise,
        ctrlLoginEnterprise,
        ctrlUpdateEnterprise,
        ctrlDeleteEnterprise } from "../controllers/enterprise.controller.js";
import { createEnterpriseSchema, loginEnterpiseSchema } from "../models/Schema/enterprise.Schema.js";
import { validator } from "../middlewares/validator.js";

const enterpriseRouter = Router();

// Route to get all enterprise
enterpriseRouter.get('/', ctrlGetAllEnterprise);

// Route to get a enterprise by ID
enterpriseRouter.get('/:id', ctrlGetEnterprise);

// Route to register a new enterprise, with validation middleware
enterpriseRouter.post('/register', createEnterpriseSchema, validator, ctrlCreateEnterprise);

// Route to login a enterprise, with validation middleware
enterpriseRouter.post('/login', loginEnterpiseSchema, validator, ctrlLoginEnterprise);

// Route to update an existing enterprise by ID
enterpriseRouter.put('/:id', ctrlUpdateEnterprise);

// Route to delete a enterprise by ID
enterpriseRouter.delete('/:id', ctrlDeleteEnterprise);

export { enterpriseRouter };