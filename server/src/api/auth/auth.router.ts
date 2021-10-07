import { Router } from 'express';
import LoginDto from './dto/login.dto';
import { HttpValidationError } from '../../lib/http-validation-error';
import authService from './auth.service';
import { AuthGuard } from './auth.guard';
import logger from '../../utils/logger';

const router = Router();

router.get('/check', AuthGuard, (req, res) => {
    return res.status(200).send({
        status: 200,
        message: 'Authorized',
        id: req.session.user.id,
        email: req.session.user.email,
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        logger.error(err);
    });

    res.status(201).send();
});

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
