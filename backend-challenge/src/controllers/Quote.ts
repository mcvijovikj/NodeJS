import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Quote from '../models/Quote';

const addQuote = (req: Request, res: Response) => {
    const { q, a, c, h } = req.body;

    const quote = new Quote({
        _id: new mongoose.Types.ObjectId(),
        q, a, c, h
    });

    return quote
        .save()
        .then((quote) => res.status(201).json({ quote }))
        .catch((error) => res.status(500).json({ error }))
};


const readAllQuotes = (req: Request, res: Response) => {
    return Quote.find()
        .then((quotes) => res.status(200).json({ quotes }))
        .catch((error) => res.status(500).json({ error }));
}


const readQuote = (req: Request, res: Response) => {
    const quoteId = req.params.quoteId;

    return Quote.findById(quoteId)
        .then((quote) => (quote ? res.status(200).json({ quote }) : res.status(404).json({
            message: 'Not found'
        })))
        .catch((error) => res.status(500).json({ error }));

};

export default { addQuote, readAllQuotes, readQuote };