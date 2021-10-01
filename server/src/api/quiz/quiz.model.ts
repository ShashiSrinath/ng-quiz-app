import { IQuestion } from '../question/question.model';
import { IAnswerSheet } from '../answer-sheet/answer-sheet.model';
import { Document, model, Schema } from 'mongoose';

export type IQuiz = {
    author: {
        _id: string;
    };
    questions: IQuestion[];
    answerSheets: IAnswerSheet[];
};

export type IQuizModel = IQuiz & Document;

export const QuizModel = model(
    'Quiz',
    new Schema({
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Question',
            },
        ],
        answerSheets: [
            {
                type: Schema.Types.ObjectId,
                ref: 'AnswerSheet',
            },
        ],
    })
);
