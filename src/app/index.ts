import * as http from 'http';
import * as koa from 'koa';

// Disable SourceMap since we're using ts-node for development
// import * as sourceMapSupport from 'source-map-support';

import appService from '../service/app';
import initApp from './init';

const start = (isTest : boolean) : http.Server => {

    /* istanbul ignore next line */
    if (appService.isDev) {
        console.log('Afuri Backend Service - Running in DEV mode!');
    }

    const app = new koa();
    initApp(app);

    /* istanbul ignore next line */
    return app.listen(isTest ? 0 : 3001).on('error', (err) => {
        throw err;
    });
};

export default start;
