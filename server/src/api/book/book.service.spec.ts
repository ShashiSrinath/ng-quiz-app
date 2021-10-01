import { createBook } from './book.service';
import { BookModel } from './book.model';

jest.mock('./book.model', () => ({
    BookModel: {
        create: jest.fn(async (data) => ({ ...data, _id: 'asfasfasfsfa' })),
    },
}));

describe('createBook', () => {
    test('it should call the repository with correct parameters', async () => {
        jest.setTimeout(30000);
        const testDate = new Date();
        await createBook({
            name: 'hi',
            ownerName: 'asd',
            licence: {
                number: 'asdfasf',
                endDate: testDate,
                startDate: testDate,
            },
            address: 'asdasdsa',
            
        });

        expect(BookModel.create).toBeCalledWith({
            name: 'hi',
            ownerName: 'asd',
            licence: {
                number: 'asdfasf',
                endDate: testDate,
                startDate: testDate,
            },
            address: 'asdasdsa',
          
        });
    });
});
