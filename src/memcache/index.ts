import * as redis from 'redis';
import * as redisMock from 'redis-mock';

import appService from '../service/app';

const promisify = <T>(method, ...params) : Promise<T> => {
  return new Promise((res, rej) => {
    method(...params, (err, val : T) => {
      if (err) {
        rej(err);
        return;
      }
      res(val);
    });
  });
};

class MemcacheHandler {

  private client;

  constructor() {

  }

  public init() : Promise<boolean> {
    if (appService.isTest) {
      this.client = redisMock.createClient();
    } else {
      this.client = redis.createClient({
        host: appService.MEMCACHE_URL,
        port: appService.MEMCACHE_PORT,
      });
    }

    return new Promise((res, rej) => {
      this.client.on('connect', () => {
        res(true);
      });
      this.client.on('error', (err) => rej(err));
    });
  }

  public get = (key) : Promise<string> => promisify<string>(this.client.get.bind(this.client), key);
  public set = (key, val) => promisify(this.client.set.bind(this.client), key, val);
  public del = (key) : Promise<string> => promisify<string>(this.client.del.bind(this.client), key);

  public createSessionStore() {
    return {
      get: async (key) => {
        const ret = await this.get(key);
        return JSON.parse(ret);
      },
      set: async (key, sess, ttl?) => {
        const ret = JSON.stringify(sess);
        ttl = Math.ceil(ttl / 1000);
        await this.client.set(key, ret, 'EX', ttl);
      },
      destroy: async (key) => {
        await this.client.del(key);
      }
    };
  }
}

const memcacheHandler = new MemcacheHandler();

export default memcacheHandler;
