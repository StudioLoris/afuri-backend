import start from '../../../app';
import * as request from 'supertest';

describe('"/mongo" Testing', () => {

    let server;

    beforeAll(async () => {
        server = await start(true);
    });

    afterAll(async () => {
        server.close();
    });

    test('GET should return 200', async () => {
        const res = await request(server).get('/mongo');
        expect(res.status).toBe(200);
        console.log(res.body);
    });
    test('PORT should return 200', async () => {
        const res = await request(server).post('/mongo');
        expect(res.status).toBe(200);
        console.log(res.body);
    });
    test('GET should return 200', async () => {
        const res = await request(server).get('/mongo');
        expect(res.status).toBe(200);
        console.log(res.body);
    });
});
