import * as koa from 'koa';
import * as session from 'koa-session';

import appService from '../../service/app';
import { initDB, initEntityHandler } from '../../db';
import memcacheHandler from '../../memcache';
import { User } from '../../db/entity/user';

const initApp = async (app : koa) => {
    const connection = await initDB();
    await initEntityHandler(connection);
    await memcacheHandler.init();

    app.use(session({
        key: 'resasdf',
        store: memcacheHandler.createSessionStore(),
    }, app));

    console.log('Init Done!');
};

export default initApp;
