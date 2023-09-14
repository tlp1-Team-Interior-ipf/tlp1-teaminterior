import { Router } from 'express';
import { ctrlCreateUser,
    ctrlDeleteUser,
    ctrlGetAllUsers,
    ctrlGetUser,
    ctrlUpdateUser,
    ctrlLoginUser } from '../controllers/user.controller.js';
import { createUserSchema, loginUserSchema } from '../models/Schema/User.Schema.js';
import {validator} from '../middlewares/validator.js';

const userRouter = Router();

// Route to get all users
userRouter.get('/', ctrlGetAllUsers);

// Route to get a user by ID
userRouter.get('/:id', ctrlGetUser);

// Route to register a new user, with validation middleware
userRouter.post('/register', createUserSchema, validator, ctrlCreateUser);

// Route to login a user, with validation middleware
userRouter.post('/login', loginUserSchema, validator, ctrlLoginUser);

// Route to update an existing user by ID
userRouter.put('/:id', ctrlUpdateUser);

// Route to delete a user by ID
userRouter.delete('/:id', ctrlDeleteUser);

export { userRouter };