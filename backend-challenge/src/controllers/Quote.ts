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
    let result: AxiosResponse = await axios.get(`https://zenquotes.io/api/quotes`);
    let quotes: [Quote] = result.data;

    return res.status(200).json({
        message: quotes

    });

};

// getting a single quote
const getOneQuote = async (req: Request, res: Response, next: NextFunction) => {

    let result: AxiosResponse = await axios.get(`https://zenquotes.io/api/random/`);
    let quote: Quote = result.data;
    return res.status(200).json({
        message: quote
    });
};


//adding quotes to DB
const addQuotes = async (req: Request, res: Response, next: NextFunction) => {
    const { q, a, c, h } = req.body;

    let response: AxiosResponse = await axios.post(`https://zenquotes.io/api/quotes`, {
        q,
        a,
        c,
        h
    });

    const quote = new Quote({
        _id: new mongoose.Types.ObjectId(),
        q, a, c, h
    });

    return quote
        .save()
        .then((quote) => res.status(201).json({ quote }))
        .catch((error) => res.status(500).json({ error }))
};


export default { getQuotes, getOneQuote, addQuotes }

