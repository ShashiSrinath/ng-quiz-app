import { IQuestionModel } from '../question/question.model';
import { IAnswerSheet } from '../answer-sheet/answer-sheet.model';
import { Document, model, Schema } from 'mongoose';

export type IQuiz = {
    title: string;
    passcode: string;
    author: {
        _id: string;
    };
    questions: Map<string, IQuestionModel>;
    answerSheets: IAnswerSheet[];
};

export type IQuizModel = IQuiz & Document;

export const QuizModel = model<IQuizModel>(
    'Quiz',
    new Schema({
        title: {
            type: String,
            required: true,
        },
        passcode: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        questions: {
            type: Map,
            of: {
                type: Schema.Types.ObjectId,
                ref: 'Question',
            },
        },
        answerSheets: [
            {
                type: Schema.Types.ObjectId,
                ref: 'AnswerSheet',
            },
        ],
    })
);
