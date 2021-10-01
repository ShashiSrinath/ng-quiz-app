import { Document, Model, model, Schema } from 'mongoose';

export interface IUser {
    email: string;
    password: string;
}

export type IUserModel = IUser & Document;

export const UserModel: Model<IUserModel> = model(
    'User',
    new Schema({
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    })
);
