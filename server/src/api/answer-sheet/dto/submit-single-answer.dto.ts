import Joi, { ValidationError } from 'joi';

export type SubmitSingleAnswerDTO = {
    _id: string;
    answers: {
        [questionNumber: string]: {
            question: string;
            answer: string;
        };
    };
};

export const submitSingleAnswerSchema = {
    _id: Joi.string().required(),
    answers: Joi.object()
        .pattern(
            /^/,
            Joi.object({
                question: Joi.string().required(),
                answer: Joi.string().required(),
            }).required()
        )
        .required(),
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
