import * as koa from 'koa';
import * as Router from 'koa-router';

import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install(); // TODO: Only install it in DEV mode
console.log('Afuri Backend Service');

const app = new koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Afuri Backend Service';
});

app.use(router.routes());

app.listen(3001);
