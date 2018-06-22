class AppService {

    public isDev : boolean = false;
    public isTest : boolean = false;
    public MEMCACHE_URL : string;
    public MEMCACHE_PORT : string;

    private RMDB_TYPE : string;
    private RMDB_URL : string;
    private RMDB_PORT : string;
    private RMDB_DATABASE : string;
    private RMDB_USERNAME : string;
    private RMDB_PASSWORD : string;

    constructor() {
        const {
            npm_config_DEV,
            RMDB_TYPE,
            RMDB_URL,
            RMDB_PORT,
            RMDB_USERNAME,
            RMDB_PASSWORD,
            RMDB_DATABASE,
            MEMCACHE_URL,
            MEMCACHE_PORT,
            MEMCACHE_USERNAME,
            MEMCACHE_PASSWORD,
        } = process.env;

        this.isDev = npm_config_DEV === 'DEV';
        this.MEMCACHE_URL = MEMCACHE_URL || '127.0.0.1';
        this.MEMCACHE_PORT = MEMCACHE_PORT || '6379';

        this.RMDB_TYPE = RMDB_TYPE || 'postgres';
        this.RMDB_PORT = RMDB_PORT || '5432';
        this.RMDB_URL = RMDB_URL || '127.0.0.1';
        this.RMDB_DATABASE = RMDB_DATABASE || 'afuri';
        this.RMDB_USERNAME = RMDB_USERNAME || 'afuri';
        this.RMDB_PASSWORD = RMDB_PASSWORD || 'password';
    }

    public getDBconfig() : any {
        if (this.isTest) {
            return {
                type: 'sqlite',
                database: `./dev_test_db/dev_db_${Math.random()}.db`,
            };
        }
        return {
            type: 'postgres',
            host: this.RMDB_URL,
            port: this.RMDB_PORT,
            username: this.RMDB_USERNAME,
            password: this.RMDB_USERNAME,
            database: this.RMDB_DATABASE,
        };
    }
}

const service = new AppService();

export default service;
