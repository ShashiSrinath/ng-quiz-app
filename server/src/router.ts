import { Router } from 'express';
import authRouter from './api/auth/auth.router';
import quizRouter from './api/quiz/quiz.router';
import answerSheetRouter from './api/answer-sheet/answer-sheet.route';

const router = Router();
const API_PREFIX = '/api';

router.use(`${API_PREFIX}/auth`, authRouter);
router.use(`${API_PREFIX}/quiz`, quizRouter);

router.use(`${API_PREFIX}/answer-sheet`, answerSheetRouter);

export default router;
