import 'reflect-metadata';
import appService from '../service/app';
import { createConnection, Db, Connection, Repository } from 'typeorm';
import { User } from './entity/user';
import { Wallet } from './entity/wallet';

let EntityHandler : {
    user : Repository<User>;
    wallet : Repository<Wallet>;
};

export const initDB = async () : Promise<Connection> => {

    const CONFIG = appService.getDBconfig();

    return createConnection({
        ...CONFIG,
        entities: [
            User,
            Wallet,
        ],
        synchronize: true,
    });
};

export const initEntityHandler = async (connection : Connection) => {
    EntityHandler = {
        user: connection.getRepository(User),
        wallet: connection.getRepository(Wallet),
    };
};

export { EntityHandler };
