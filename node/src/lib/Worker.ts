import asyncRedis from 'async-redis';
import { ConnectionBase } from 'mongoose';
import Db from './Db';

class Worker extends Db {

  redis: any;

  getRedisClient = (callback: (err: any) => {}) => {
    const client = asyncRedis.createClient();
    return { 
      client: client,
      onError: () => {
        client.on('error', (err) => {
          callback(err);
        })
      }
    };
  }

  constructor() {
    super();
  }


}

export default Worker;