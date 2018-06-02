import * as Router from 'koa-router';

const root = new Router();

root.get('/', async (ctx) => {
    ctx.body = { user: 123 };
});

export default root;
