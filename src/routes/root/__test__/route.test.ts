import start from '../../../app';
import * as request from 'supertest';

describe('"/" Testing', () => {

    let server;

    beforeAll(async () => {
        server = await start(true);
    });

    afterAll(async () => {
        server.close();
    });

    it('GET should return 200', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
    });
});
