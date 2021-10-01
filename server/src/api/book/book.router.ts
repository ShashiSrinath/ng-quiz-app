import { Router } from 'express';
import { createBook } from './book.service';
import CreateBookDto from './dto/create-book.dto';
import { HttpValidationError } from '../../lib/http-validation-error';

const router = Router();

router.post('/', async (req, res, next) => {
    const { error, value } = CreateBookDto.validate(req.body);

    if (error) {
        return next(new HttpValidationError(error));
    }

    const book = await createBook(value);
    return res.status(200).json(book);
});

export default router;
