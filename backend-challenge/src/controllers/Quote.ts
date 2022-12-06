import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Quote from '../models/Quote';
import axios, { AxiosResponse } from 'axios'


interface Quote {
    q: String;
    a: String;
    c: String;
    h: String;
}

// getting all quotes
const getQuotes = async (req: Request, res: Response, next: NextFunction) => {
    const result: AxiosResponse = await axios.get(`https://zenquotes.io/api/quotes`);

    try {
        const quotes: [Quote] = await result.data;
        //console.log({quotes});
        const allQuotes = quotes.map((quote) => ({
            q: quote['q'],
            a: quote['a'],
            c: quote['c'],
            h: quote['h']
        }))

        Quote.insertMany(quotes);
    } catch (error) {

    }
}

//Fetch stored data from DB
const getStoredData = async (req: Request, res: Response, next: NextFunction) => {

    Quote.find().then(quotes => {
        if (!quotes) {
            res.status(400).send('Requested URL is not accessible');
        }
        return res.status(200).json({ quotes: quotes });
    }).catch(err => console.log(err));

}

// getting a single quote from DB
const getOneQuote = async (req: Request, res: Response, next: NextFunction) => {

    Quote.find().limit(1).skip(Math.random() * 22).then(quotes => {
        if (!quotes) {
            res.status(400).send('Requested data does not exist!');
        }
        return res.status(200).json({ quotes: quotes });
    }).catch(err => console.log(err));
};


export default { getQuotes, getOneQuote, getStoredData }

