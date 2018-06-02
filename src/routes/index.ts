import * as Router from 'koa-router';

import root from './root';
import user from './user';

const routes = new Router();

routes.use('/', root.routes());
routes.use('/user', user.routes());

export default routes;
