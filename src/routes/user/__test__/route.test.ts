import start from '../../../app';
import * as request from 'supertest';

describe('"/user" Testing', () => {

    let server;

    beforeAll(async () => {
        server = await start(true);
    });

    afterAll(async () => {
        server.close();
    });

    test('GET should return 200', async () => {
        const res = await request(server).get('/user');
        expect(res.status).toBe(200);
    });

});
