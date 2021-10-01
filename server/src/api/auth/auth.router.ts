import { Router } from 'express';
import LoginDto from './dto/login.dto';
import { HttpValidationError } from '../../lib/http-validation-error';
import authService from './auth.service';

const router = Router();

router.post('/login', async (req, res, next) => {
    const { error, value } = LoginDto.validate(req.body);

    if (error) {
        return next(new HttpValidationError(error));
    }

    try {
        return res.status(200).json(await authService.login(req, value));
    } catch (e) {
        return next(e);
    }
});

router.post('/register', async (req, res, next) => {
    const { error, value } = LoginDto.validate(req.body);

    if (error) {
        return next(new HttpValidationError(error));
    }

    try {
        return res.status(200).json(await authService.register(value));
    } catch (e) {
        next(e);
    }
});

export default router;
