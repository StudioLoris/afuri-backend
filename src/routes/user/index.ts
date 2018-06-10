import * as Router from 'koa-router';
import { EntityHandler } from '../../db';
import { User } from '../../db/entity/user';

const userRoute = new Router();

userRoute.get('/', async (ctx) => {
    // console.log(ctx.);
    console.log(ctx.request.body);
    ctx.body = {
        apiProvider: 'Afuri',
        version: '0.0.1',
    };
});

userRoute.post('/check', async (ctx) => {
    // console.log(ctx.);
    console.log(ctx.request.body);
    const { email } = ctx.request.body as any;
    let userToCheck = await EntityHandler.user.findOne({ email });
    console.log(userToCheck);
    if (!userToCheck) {
        const user = new User();
        user.email = email;
        await EntityHandler.user.save(user);
        console.log('New User created');
        userToCheck = await EntityHandler.user.findOne({ email });
    }
    ctx.body = userToCheck;
});

export default userRoute;
