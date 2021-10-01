import app from '../app';
import request from 'supertest';
import { initDBConnection } from '../lib/mongodb';
import { BookModel } from '../api/book/book.model';

describe('Book API Integration Tests', () => {
    jest.setTimeout(45000);

    beforeAll(async () => {
        await initDBConnection();
    });

    beforeEach(async () => {
        try {
            await BookModel.collection.drop();
            // eslint-disable-next-line no-empty
        } catch (e) {}
    });

    describe('#POST /books', () => {
        it('should give a validation error when no body is provided', async () => {
            const result = await request(app).post('/api/books');
            expect(result.status).toBe(400);
            expect(result.body.name).toEqual('ValidationError');
            expect(result.body.details.length).toBe(5);
        });

        it('should create a book on correct input', async () => {
            const result = await request(app)
                .post('/api/books')
                .send({
                    address: 'fake address',
                    name: 'FL7',
                    ownerName: 'John Doe',
                    licence: {
                        number: '1234',
                        startDate: new Date('2021-01-01'),
                        endDate: new Date('2021-12-31'),
                    },
                });
            expect(result.status).toBe(200);
            expect(result.body._id).toBeDefined();
        });
    });
});
