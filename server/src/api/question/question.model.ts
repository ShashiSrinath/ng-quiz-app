import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export type IQuestion = {
    questionNumber: number;
    type: string;
    question: string;
    multipleChoices: string[];
    correctAnswer: string;
};

export type IQuestionModel = IQuestion & Document;

export const QuestionModel = model<IQuestion>(
    'Question',
    new Schema({
        questionNumber: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ['mcq'],
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        multipleChoices: [
            {
                type: String,
            },
        ],
        correctAnswer: {
            type: String,
            required: true,
        },
    })
);
