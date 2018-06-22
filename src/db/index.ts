import 'reflect-metadata';
import appService from '../service/app';
import { createConnection, Db, Connection, Repository } from 'typeorm';
import { User } from './entity/user';

let EntityHandler : {
    user : Repository<User>;
};

export const initDB = async () : Promise<Connection> => {

    const CONFIG = appService.getDBconfig();

    return createConnection({
        ...CONFIG,
        entities: [
            User,
        ],
        synchronize: true,
    });
};

export const initEntityHandler = async (connection : Connection) => {
    EntityHandler = {
        user: connection.getRepository(User),
    };
};

export { EntityHandler };
