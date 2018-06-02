import start from '../src/app';
import * as request from 'supertest';

const server = start(true);

afterEach(() => server.close());

describe('Afuri API Testing', () => {
    test('Root should return 200', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
    });
});
