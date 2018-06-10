import 'reflect-metadata';
import { createConnection, Db, Connection, Repository } from 'typeorm';
import { User } from './entity/user';

let EntityHandler : {
    user : Repository<User>;
};

export const initDB = async () : Promise<Connection> => createConnection({
    type: 'sqlite',
    database: './dev_db.db',
    entities: [
        User,
    ],
    synchronize: true,
});

export const initEntityHandler = async (connection : Connection) => {
    EntityHandler = {
        user: connection.getRepository(User),
    };
};

export { EntityHandler };
