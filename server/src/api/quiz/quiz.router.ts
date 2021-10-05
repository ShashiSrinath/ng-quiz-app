import quizService from './quiz.service';
import { Router } from 'express';
import createQuizJsonDto from './dto/create-quiz-json.dto';
import { HttpValidationError } from '../../lib/http-validation-error';
import { fileUpload } from '../../lib/local-file-upload';
import createQuizXlsxDto from './dto/create-quiz-xlsx.dto';
import { AuthGuard } from '../auth/auth.guard';

const router = Router();

// create a quiz ( from json )
router.post('/create-from-json', AuthGuard, async (req, res, next) => {
    const { error, value } = createQuizJsonDto.validate(req.body);

    if (error) {
        return next(new HttpValidationError(error));
    }

    try {
        res.status(200).json(
            await quizService.createAQuizFromJSON(req.session.user.id, value)
        );
    } catch (e) {
        next(e);
    }
});

// create a quiz by excel sheet
router.post(
    '/create-from-xlsx',
    AuthGuard,
    fileUpload.single('file'),
    async (req, res, next) => {
        const { error, value } = createQuizXlsxDto.validate(req.body);

        if (error) {
            return next(new HttpValidationError(error));
        }
        // @ts-ignore
        const buffer = req.file?.buffer;
        const result = await quizService.createAQuizFromExcelSheet(
            req.session.user.id,
            buffer,
            value
        );
        return res.json(result);
    }
);

// view quiz - ( for student)
router.get('/as-student/:quizId', async (req, res, next) => {
    try {
        res.status(200).json(
            await quizService.getQuizAsStudent(req.params.quizId)
        );
    } catch (e) {
        next(e);
    }
});

// view quiz status - ( for owner )
router.get('/as-owner/:quizId', AuthGuard, async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const userId = req.session.user.id;
        const quiz = await quizService.getQuizAsOwner(userId, quizId);

        res.status(200).json(quiz);
    } catch (e) {
        next(e);
    }
});

export default router;
