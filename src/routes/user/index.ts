import * as Router from 'koa-router';
import http_status from '../../constants/http_status';
import OauthService from '../../service/oauth';
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
    /**
     * TODO: Check user session. If session is invalid, we'll run the following checks
     */
    const invalidSession = true;
    if (invalidSession) {
        const { email, provider, token } = ctx.request.body as any;
        const isValidOauth = await OauthService.validate(provider, token);
        if (!isValidOauth) {
            ctx.throw(http_status.UNAUTHORIZED, '');
            return;
        }
        const user = await findUser({ email });
        if (!user) {
            await createUser({ email });
            ctx.status = http_status.CREATED;
        } else {
            ctx.status = http_status.OK;
        }
        ctx.body = {};
    } else {
        ctx.status = http_status.OK;
        ctx.body = {};
    }
});

export default userRoute;
