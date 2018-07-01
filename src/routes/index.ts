import * as Router from 'koa-router';

import root from './root';
import userRoute from './user';
import mongoTest from './mongoTest';

const routes = new Router();

routes.use('/', root.routes());
routes.use('/user', userRoute.routes());
routes.use('/mongo', mongoTest.routes());

export default routes;
