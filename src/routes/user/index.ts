import * as Router from 'koa-router';
import {
    findUser,
    createUser
} from '../../db/utils/users';

const userRoute = new Router();

userRoute.get('/', async (ctx) => {
    ctx.body = {
        apiProvider: 'Afuri',
        version: '0.0.1',
    };
});

userRoute.post('/check', async (ctx) => {
    console.log(ctx.request.body);
    const { email } = ctx.request.body as any;
    /**
     * TODO: Check user session. If session is invalid, we'll run the following checks
     */
    const invalidSession = true;
    if (invalidSession) {
        /**
         * check oauth toekn first
         */

        const user = await findUser({ email });
        if (!user) {
            await createUser({ email });
            console.log('New User created');
        }
    }
    ctx.body = {};
});

export default userRoute;
