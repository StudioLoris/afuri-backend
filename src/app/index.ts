import * as http from 'http';
import * as koa from 'koa';
import * as Router from 'koa-router';
// Disable SourceMap since we're using ts-node for development
// import * as sourceMapSupport from 'source-map-support';

import appService from '../service/app';

const start = (isTest : boolean) : http.Server => {

    console.log('Afuri Backend Service');

    if (appService.isDev()) {
        console.log('Running in DEV mode!');
    }

    const app = new koa();
    const router = new Router();

    router.get('/', async (ctx) => {
        ctx.body = 'Afuri Backend Service';
    });

    app.use(router.routes());
    return app.listen(3001).on('error', (err) => {
        throw err;
    });
};

export default start;
