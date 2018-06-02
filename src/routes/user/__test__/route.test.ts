import start from '../../../app';
import * as request from 'supertest';

const server = start(true);

afterEach(() => server.close());

describe('"/user" Testing', () => {
    test('GET should return 200', async () => {
        const res = await request(server).get('/user');
        expect(res.status).toBe(200);
    });
});
