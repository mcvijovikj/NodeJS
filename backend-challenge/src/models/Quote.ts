import mongoose, { Document, Schema } from 'mongoose';

export interface IQuote {
    q: string;
    a: string;
    c: string;
    h: string;
}

export interface IQuoteModel extends IQuote, Document { }

const QuoteSchema: Schema = new Schema(
    {
        q: { type: String, required: true, unique: true },
        a: { type: String, required: true, unique: true },
        c: { type: String, required: true, unique: true },
        h: { type: String, required: true, unique: true }

    });


export default mongoose.model<IQuoteModel>('Quote', QuoteSchema);
