import { Router } from 'express';
import { HttpValidationError } from '../../lib/http-validation-error';
import createAnserSheetDTO from './dto/create-answer-sheet.dto';
import submitSingleAnswerDTO from './dto/submit-single-answer.dto';
import answerSheetServer from './answer-sheet.service';
import Joi from 'joi';

const router = Router();

// create a answer sheet
router.post('/create-answer-sheet', async (req, res, nxt) => {
    const { error, value } = createAnserSheetDTO.validate(req.body);

    if (error) {
        return nxt(new HttpValidationError(error));
    }

    try {
        res.status(200).json(await answerSheetServer.createAnswerSheet(value));
    } catch (err) {
        nxt(err);
    }
});

// submit a single answer (put)
router.post('/submit-single-answer', async (req, res, nxt) => {
    const { error, value } = submitSingleAnswerDTO.validate(req.body);

    if (error) {
        return nxt(new HttpValidationError(error));
    }

    try {
        res.status(200).json(await answerSheetServer.submitSingleAnswer(value));
    } catch (err) {
        nxt(err);
    }
});

// finish answer sheet
router.post('/finish-answer-sheet', async (req, res, nxt) => {
    const schema = Joi.object()
        .keys({
            _id: Joi.string().required(),
        })
        .required();

    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        return nxt(new HttpValidationError(error));
    }

    try {
        res.status(200).json(await answerSheetServer.finishAnswerSheet(value));
    } catch (err) {
        nxt(err);
    }
});

export default router;
