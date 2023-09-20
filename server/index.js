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
import { handleErrors } from "./src/middlewares/handleError.js";
import { createLogs } from "./src/helpers/createLogs.js";
import './src/models/driver_enterprise.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

//Middleware necessary
app.use(cors());
app.use(helmet());
app.use(morgan('combined', {
  stream: {
    write: (message) => {
      createLogs(message, __dirname, 'logs');
    },
  },
}));
app.use(express.json())

//Routes are established
app.use('/users', userRouter)
app.use('/drivers', driverRouter)
app.use('/enterprise', enterpriseRouter)

// Error handling
app.use(handleErrors);

// Starting the server
app.listen(environments.PORT, async () => {
    console.log(`server on port http://localhost:${environments.PORT}`)
    connectToDatabase()
});