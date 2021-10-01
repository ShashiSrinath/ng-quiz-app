import { BookModel, IBook, IBookModel } from './book.model';
import { CreateBookDto } from './dto/create-book.dto';


export const createBook = async ({
    address,
    licence,
    name,
    ownerName,
}: CreateBookDto): Promise<IBookModel> => {
    const book: IBook = {
        address,
        name,
        ownerName,
        licence,
    };

    return BookModel.create(book);
};

export const bookExistsById = async (id: string): Promise<boolean> => {
    return BookModel.exists({ _id: id });
};

export const findBookById = async (id: string): Promise<IBookModel> => {
    return BookModel.findById(id);
};

export default {
    createBook,
    findBookById,
};
