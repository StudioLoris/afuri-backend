import 'reflect-metadata';
import appService from '../service/app';
import { createConnection, Db, Connection, Repository, ConnectionOptions } from 'typeorm';
import { User } from './entity/user';
import { Wallet } from './entity/wallet';
import { Test } from './entity/test';
import UUID from '../service/utils/UUID';

const EntityHandler : {
    user? : Repository<User>;
    wallet? : Repository<Wallet>;
    mongoManager? : any;
} = {};

export const initDB = async () : Promise<Connection> => {

    const CONFIG = appService.getDBconfig();

    return createConnection({
        name: 'rmdb',
        ...CONFIG,
        entities: [
            User,
            Wallet,
        ],
        synchronize: true,
    });
};

export const initMongo = async () : Promise<Connection> => {

    const mongoConnectionConfig : {
        name : 'nosql',
        type : 'mongodb',
        entities : Array<any>,
        port? : number,
        database? : string,
        host? : string,
    } = {
        name: 'nosql',
        type: 'mongodb',
        entities: [ Test ],
    };

    if (appService.isTest) {
        // Connect to in-memory mongo in TEST
        const dbName = UUID();
        const PORT = 27019;
        const mongoUnit = await import('mongo-unit');
        try {
            await mongoUnit.start({port: PORT});
        } catch(err) {
            if (err !== 'already running') {
                throw err;
            }
        }
        mongoConnectionConfig.port = PORT;
        mongoConnectionConfig.database = dbName;
        mongoConnectionConfig.host = 'localhost';
    } else {
        // Connect to real mongo in DEV and PROD
        mongoConnectionConfig.host = 'localhost';
        mongoConnectionConfig.port = 27017;
        mongoConnectionConfig.database = 'afuri';
    }

    return createConnection(mongoConnectionConfig);
};

export const initEntityHandler = async (connection : Connection) => {
    EntityHandler.user = connection.getRepository(User);
    EntityHandler.wallet = connection.getRepository(Wallet);
};

export const initMongoEntityHandler = async (connection : Connection) => {
    EntityHandler.mongoManager = connection.mongoManager;
};

export { EntityHandler };
