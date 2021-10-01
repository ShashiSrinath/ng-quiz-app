import { Document } from 'mongoose';

export type IAnswerSheet = {
    quizId: string;
    userCode: string;
    status: string;
    answers: {
        question: {
            _id: string;
            questionNumber: string;
        };
        answer: string;
    }[];
};

export type IAnswerModel = IAnswerSheet & Document;

import { Schema, model } from 'mongoose';

export const AnswerSheetModel = model(
    'AnswerSheet',
    new Schema({
        quizId: {
            type: Schema.Types.ObjectId,
            ref: 'quiz',
        },
        status: {
            type: String,
            enum: ['Ongoing', 'Finished'],
            required: true,
        },
        userCode: {
            type: String,
            required: true,
        },
        answers: [
            {
                question: {
                    type: Schema.Types.ObjectId,
                    ref: 'question',
                },
                answer: {
                    type: String,
                    required: true,
                },
            },
        ],
    })
);
