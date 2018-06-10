import * as Router from 'koa-router';

const root = new Router();

root.get('/', async (ctx) => {
    ctx.body = {
        apiProvider: 'Afuri',
        version: '0.0.1',
    };
});

export default root;
