import * as http from 'http';
import * as koa from 'koa';

// Disable SourceMap since we're using ts-node for development
// import * as sourceMapSupport from 'source-map-support';

import appService from '../service/app';
import initApp from './init';

interface AfuriServer extends http.Server {
    terminate : () => void;
}

const start = async (isTest : boolean) : Promise<AfuriServer> => {

    appService.isTest = isTest;

    /* istanbul ignore next line */
    if (appService.isDev) {
        console.log('Afuri Backend Service - Running in DEV mode!');
    }

    const app = new koa();
    await initApp(app);

    app.terminate = async () => {
        console.log('terminating...');
        if (appService.isTest) {
            const mongoUnit = await import('mongo-unit');
            await mongoUnit.stop();
        }
        console.log('terminating done...');
    };

    return app.listen(isTest ? 0 : 3001).on('error', (err) => { throw err; });
};

export default start;
