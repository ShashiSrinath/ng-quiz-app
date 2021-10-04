import Joi, { ValidationError } from 'joi';
import { IQuestion } from '../../question/question.model';

export type CreateQuizXlsxDto = {
    title: string;

};

export const createQuizXlsxValidationSchema = {
    title: Joi.string().required()

};

export const createQuizXlsxValidationObject = Joi.object(
    createQuizXlsxValidationSchema
).required();

export default {
    validate: (
        data: unknown
    ): {
        error?: ValidationError;
        value: CreateQuizXlsxDto;
    } => {
        return createQuizXlsxValidationObject.validate(data, {
            abortEarly: false,
            stripUnknown: true,
        });
    },
};
