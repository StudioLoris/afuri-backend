import { initDB, initEntityHandler } from '../../db';
import { User } from '../../db/entity/user';

const initApp = async () => {
    const connection = await initDB();
    const entityHandler = await initEntityHandler(connection);
    console.log('Init Done!');
};

export default initApp;
