import { Router } from 'express';
import { HttpValidationError } from '../../lib/http-validation-error';
import createAnserSheetDTO from './dto/create-answer-sheet.dto';
import submitSingleAnswerDTO from './dto/submit-single-answer.dto';
import answerSheetServer from './answer-sheet.service';
import { HttpError } from '../../lib/http-error';

const router = Router();

// create a answer sheet
router.post('/create-answer-sheet', async (req, res, nxt) => {
    const { error, value } = createAnserSheetDTO.validate(req.body);

    if (error) {
        return nxt(new HttpValidationError(error));
    }

    try {
        const answerSheet = await answerSheetServer.createAnswerSheet(value);
        // set answer-sheet session
        req.session.answerSheet = { id: answerSheet.id.toString() };
        res.status(200).json(answerSheet);
    } catch (err) {
        nxt(err);
    }
});

// submit a single answer (put)
router.post('/submit-single-answer', async (req, res, nxt) => {
    const { error, value } = submitSingleAnswerDTO.validate(req.body);

    // check answer-sheet data
    if (!req.session.answerSheet) {
        return nxt(
            new HttpError(
                401,
                'You dont have a valid answer-sheet. Please create a new answer-sheet first'
            )
        );
    }

    if (error) {
        return nxt(new HttpValidationError(error));
    }

    try {
        res.status(200).json(
            await answerSheetServer.submitSingleAnswer(
                req.session.answerSheet.id,
                value
            )
        );
    } catch (err) {
        nxt(err);
    }
});

// finish answer sheet
router.post('/finish-answer-sheet', async (req, res, nxt) => {
    if (!req.session.answerSheet) {
        return nxt(
            new HttpError(
                401,
                'You dont have a valid answer-sheet. Please create a new answer-sheet first'
            )
        );
    }
    try {
        const result = await answerSheetServer.finishAnswerSheet(
            req.session.answerSheet.id
        );
        delete req.session.answerSheet;
        res.status(200).json(result);
    } catch (err) {
        nxt(err);
    }
});

export default router;
