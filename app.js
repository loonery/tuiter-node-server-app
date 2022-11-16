// library imports
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Controller imports
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";

// set up 'app' as an instance of a server using express
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/tuiter'
mongoose.connect(CONNECTION_STRING);   // connect to my tuiter database

const app = express();
app.use(express.json());
app.use(cors());

// pass the app to our various HTTP request controllers
TuitsController(app);
HelloController(app);
UserController(app);

app.listen(process.env.PORT || 4000);