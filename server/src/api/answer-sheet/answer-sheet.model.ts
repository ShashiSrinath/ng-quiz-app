import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export type IAnswerSheet = {
    quizId: string;
    userCode: string;
    status: string;
    answers: {
        [key: string]: {
            question: {
                _id: string;
                questionNumber: string;
            };
            answer: string;
        };
    };
};

export type IAnswerModel = IAnswerSheet & Document;

export const AnswerSheetModel = model(
    'AnswerSheet',
    new Schema({
        quizId: {
            type: Schema.Types.ObjectId,
            ref: 'Quiz',
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
        answers: {
            type: Map,
            of: {
                question: {
                    type: Schema.Types.ObjectId,
                    ref: 'Question',
                },
                answer: {
                    type: String,
                    required: true,
                },
            },
        },
    })
);
