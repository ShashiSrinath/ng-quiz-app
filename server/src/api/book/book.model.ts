import { Document, Model, model, Schema } from 'mongoose';

export interface IBook {
    name: string;
    ownerName: string;
    licence: {
        number: string;
        startDate: Date;
        endDate: Date;
    };
    address: string;
}

export type IBookModel = IBook & Document;

export const BookModel: Model<IBookModel> = model(
    'book',
    new Schema({
        name: String,
        ownerName: String,
        licence: {
            number: String,
            startDate: String,
            endDate: String,
        },
        address: String,
    })
);
