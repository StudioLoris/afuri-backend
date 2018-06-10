import * as Router from 'koa-router';

import root from './root';
import userRoute from './user';

const routes = new Router();

routes.use('/', root.routes());
routes.use('/user', userRoute.routes());

export default routes;
