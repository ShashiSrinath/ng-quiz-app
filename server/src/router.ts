import { Router } from 'express';
import authRouter from './api/auth/auth.router';
import quizRouter from './api/quiz/quiz.router';

const router = Router();
const API_PREFIX = '/api';

router.use(`${API_PREFIX}/auth`, authRouter);
router.use(`${API_PREFIX}/quiz`, quizRouter);

export default router;
