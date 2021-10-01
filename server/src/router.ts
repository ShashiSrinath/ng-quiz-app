import { Router } from 'express';
import booksRouter from './api/book/book.router';


const router = Router();
const API_PREFIX = '/api';

router.use(`${API_PREFIX}/books`, booksRouter);


export default router;
