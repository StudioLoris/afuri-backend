import * as koa from 'koa';
import * as session from 'koa-session';
import * as bodyParser from 'koa-bodyparser';
import routes from '../../routes';

import { initDB, initMongo, initEntityHandler, initMongoEntityHandler } from '../../db';
import memcacheHandler from '../../memcache';

const initApp = async (app : koa) => {
    const connection = await initDB();
    const mongo = await initMongo();
    await initEntityHandler(connection);
    await initMongoEntityHandler(mongo);
    await memcacheHandler.init();

    app.keys = ['asdasdasdasdasd'];

    app.use(session({
        key: 'se:resasdf',
        maxAge: 1000 * 60 * 30, // 30 minutes session live time
        store: memcacheHandler.createSessionStore(),
    }, app));

    app.use(bodyParser());
    app.use(routes.routes());

    console.log('Init Done!');
};

export default initApp;
