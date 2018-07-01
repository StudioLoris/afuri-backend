import start from '../../../app';
import * as request from 'supertest';

jest.setTimeout(100000);

describe('"/user" Testing', () => {

    let server;

    beforeAll(async () => {
        server = await start(true);
    });

    afterAll(async () => {
        server.terminate();
    });

    test('GET should return 200', async () => {
        const res = await request(server).get('/user');
        expect(res.status).toBe(200);
    });

});
