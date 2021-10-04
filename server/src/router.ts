import { Router } from 'express';
import authRouter from './api/auth/auth.router';
import quizRouter from './api/quiz/quiz.router';
import answerSheetRouter from './api/answer-sheet/answer-sheet.route';
=======
import quizRouter from './api/quiz/quiz.router';
>>>>>>> ffe805dabbf8aa9d427d816cac1c44c0c885f51e

const router = Router();
const API_PREFIX = '/api';

router.use(`${API_PREFIX}/auth`, authRouter);
router.use(`${API_PREFIX}/quiz`, quizRouter);
router.use(`${API_PREFIX}/answer-sheet`, answerSheetRouter);

export default router;
