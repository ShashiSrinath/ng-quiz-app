import Joi, { ValidationError } from 'joi';

export type CreateAnswerSheetDTO = {
    quizId: string;
    userCode: string;
};

export const createAnswerSheetSchema = {
    quizId: Joi.string().required(),
    userCode: Joi.string().required(),
};

export const createAnswerSheetObject = Joi.object(
    createAnswerSheetSchema
).required();

export default {
    validate: (
        data: unknown
    ): { error?: ValidationError; value: CreateAnswerSheetDTO } => {
        return createAnswerSheetObject.validate(data, {
            abortEarly: false,
            stripUnknown: true,
        });
    },
};
