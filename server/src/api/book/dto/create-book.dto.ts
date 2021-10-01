import Joi, { ValidationError } from 'joi';

export interface CreateBookDto {
    address: string;
    licence: { number: string; startDate: Date; endDate: Date };
    name: string;
    ownerName: string;
}

const schema = Joi.object({
    address: Joi.string().required(),
    licence: Joi.object({
        number: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
    }).required(),
    name: Joi.string().required(),
    ownerName: Joi.string().required(),
}).required();



export const validate = (
    data: unknown
): {
    error?: ValidationError;
    value: CreateBookDto;
} => {
    return schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
    });
};

export default {
    validate,
};
