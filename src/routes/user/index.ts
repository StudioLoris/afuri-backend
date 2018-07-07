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

userRoute.post('/login', async (ctx) => {
    const session = ctx.session;
    const { provider, code } = ctx.request.body;
    if (session && session.accessToken) {
        ctx.body = {
            oauthProvider: session.oauthProvider,
            accessToken: session.accessToken,
            oauthId: session.oauthId,
        };
        ctx.status = http_status.OK;
    } else if (provider && code) {
        const accessToken = await OauthService.getAccessToken(provider, code);
        const userProfile = await OauthService.getUserProfile(provider, accessToken);
        const user = await findUser({ email: userProfile.email });
        ctx.status = http_status.OK;
        if (!user) {
            await createUser({ email: userProfile.email });
            ctx.status = http_status.CREATED;
        }
        ctx.body = {
            oauthProvider: provider,
            accessToken,
            oauthId: userProfile.id,
        };
        session.oauthProvider = provider;
        session.accessToken = accessToken;
        session.oauthId = userProfile.id;
    } else {
        ctx.throw(http_status.UNAUTHORIZED, '');
    }
});

userRoute.post('/logout', async (ctx) => {
    console.log('loggin out');
    ctx.session = null;
    ctx.status = http_status.OK;
});

export default userRoute;
