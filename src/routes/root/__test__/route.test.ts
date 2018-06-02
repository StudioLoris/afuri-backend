import start from '../../../app';
import * as request from 'supertest';

const server = start(true);

afterEach(() => server.close());

describe('"/" Testing', () => {
    test('GET should return 200', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
    });
});
