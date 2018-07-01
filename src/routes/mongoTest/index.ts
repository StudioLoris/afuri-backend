import * as Router from 'koa-router';
import {
    createTest,
    findTest,
} from '../../db/utils/test';

const userRoute = new Router();

userRoute
    .get('/', async (ctx) => {
        console.log('get mongo');
        const data = await findTest();
        ctx.body = { data };
    })
    .post('/', async (ctx) => {
        console.log('post mongo');
        await createTest('123', '345');
        ctx.body = {};
    });

export default userRoute;
