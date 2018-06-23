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
    const session = ctx.session;
    if (session && session.userId) {
        ctx.status = http_status.OK;
        return;
    } else {
        const { email, provider, token, oauthId } = ctx.request.body as any;
        const isValidOauth = await OauthService.validate(provider, token);
        if (!isValidOauth) {
            ctx.throw(http_status.UNAUTHORIZED, '');
            return;
        }
        let user = await findUser({ email });
        if (!user) {
            await createUser({ email });
            user = await findUser({ email });
            ctx.status = http_status.CREATED;
        } else {
            ctx.status = http_status.OK;
        }
        session.userId = user.id;
    }
});

userRoute.post('/logout', async (ctx) => {
    ctx.session = null;
    ctx.status = http_status.OK;
});

export default userRoute;
