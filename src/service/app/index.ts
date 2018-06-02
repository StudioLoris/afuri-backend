class AppService {

    constructor() {
    }

    public isDev = () : boolean => process.env.npm_config_DEV === 'DEV';

}

const service = new AppService();

export default service;
