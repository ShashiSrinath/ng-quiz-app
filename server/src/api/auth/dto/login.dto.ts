import Joi, { ValidationError } from 'joi';
import { IUser } from '../user.model';

export const loginValidationSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
};

export const loginValidationObject = Joi.object(
    loginValidationSchema
).required();

export default {
    validate: (
        data: unknown
    ): {
        error?: ValidationError;
        value: IUser;
    } => {
        return loginValidationObject.validate(data, {
            abortEarly: false,
            stripUnknown: true,
        });
    },
};
