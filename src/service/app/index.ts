class AppService {

    public isDev : boolean = false;
    public isTest : boolean = false;
    public MEMCACHE_URL : string;
    public MEMCACHE_PORT : string;

    constructor() {
        const {
            npm_config_DEV,
            RMDB_TYPE,
            RMDB_URL,
            RMDB_PORT,
            MEMCACHE_URL,
            MEMCACHE_PORT,
            MEMCACHE_USERNAME,
            MEMCACHE_PASSWORD,
        } = process.env;

        this.isDev = npm_config_DEV === 'DEV';
        this.MEMCACHE_URL = MEMCACHE_URL || '127.0.0.1';
        this.MEMCACHE_PORT = MEMCACHE_PORT || '6379';
    }

}

const service = new AppService();

export default service;
