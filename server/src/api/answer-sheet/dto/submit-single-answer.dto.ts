import Joi, { ValidationError } from 'joi';

export type SubmitSingleAnswerDTO = {
    questionId: string;
    questionNumber: number;
    answer: string;
};

export const submitSingleAnswerSchema = {
    questionId: Joi.string().required(),
    questionNumber: Joi.number().required(),
    answer: Joi.string().required(),
};

export const submitSingleAnswerObject = Joi.object(
    submitSingleAnswerSchema
).required();

export default {
    validate: (
        data: unknown
    ): { error?: ValidationError; value: SubmitSingleAnswerDTO } => {
        return submitSingleAnswerObject.validate(data, {
            abortEarly: false,
            stripUnknown: true,
        });
    },
};
