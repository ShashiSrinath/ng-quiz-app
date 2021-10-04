import Joi, { ValidationError } from 'joi';
import { IQuestion } from '../../question/question.model';

export type CreateQuizJsonDto = {
    title: string;
    passcode: string;
    questions: {
        [questionNumber: string]: IQuestion;
    };
};

export const createQuizJsonValidationSchema = {
    title: Joi.string().required(),
    passcode: Joi.string().required(),
    questions: Joi.object().pattern(
        /^/,
        Joi.object({
            questionNumber: Joi.number().required(),
            type: Joi.string().valid('mcq').required(),
            question: Joi.string().required(),
            multipleChoices: Joi.array().items(Joi.string()).required(),
            correctAnswer: Joi.string().required(),
        }).required()
    ),
};

export const createQuizJsonValidationObject = Joi.object(
    createQuizJsonValidationSchema
).required();

export default {
    validate: (
        data: unknown
    ): {
        error?: ValidationError;
        value: CreateQuizJsonDto;
    } => {
        return createQuizJsonValidationObject.validate(data, {
            abortEarly: false,
            stripUnknown: true,
        });
    },
};
