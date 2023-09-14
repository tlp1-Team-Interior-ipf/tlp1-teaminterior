// Imports the dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

import { environments } from "./src/config/environment.js";
import { connectToDatabase } from "./src/config/db.js";
import { userRouter } from "./src/routes/user.routes.js";
import { driverRouter } from "./src/routes/driver.routes.js";
import { enterpriseRouter } from "./src/routes/enterprise.routes.js";
import './src/models/user.js';


const app = express();

//Middleware necessary
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json())

//Routes are established
app.use('/users', userRouter)
app.use('/drivers', driverRouter)
app.use('/enterprise', enterpriseRouter)


// Starting the server
app.listen(environments.PORT, async () => {
    console.log(`server on port http://localhost:${environments.PORT}`)
    connectToDatabase()
});