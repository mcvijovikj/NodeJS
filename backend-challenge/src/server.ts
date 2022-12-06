import express, { Express } from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import quoteRoutes from '../src/routes/Quote';
import http from 'http';
import morgan from 'morgan'


const router: Express = express();

//Connect to Mongo
mongoose
    .connect(config.mongo.url)
    .then(() => {
        console.log('Successfully connected to MongoDB');

    })
    .catch((error) => console.log(error));

//Middleware 
router.use(morgan('dev'));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


//Routes
router.use('/', quoteRoutes);


// API rules
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

//Error handling operation
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

//Server
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 4200;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));