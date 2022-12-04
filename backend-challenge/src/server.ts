import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import quoteRoutes from '../src/routes/Quote';

const app = express();

//Connect to Mongo
mongoose
    .connect(config.mongo.url)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        
    })
    .catch((error) => console.log(error));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());


    //Routes
    app.use('/quotes', quoteRoutes);
    

    
