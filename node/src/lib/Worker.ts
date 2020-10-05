import asyncRedis from 'async-redis';
import Db from './Db';
import { LangType, ResponseType } from '../types';

class Worker extends Db {

  redisError = 'REDIS_ERROR';

  getRedisClient = () => {
    const { 
      REDIS_PORT,
      REDIS_HOST,
      REDIS_PASS
     }: string | any = process.env;
    const client: any = asyncRedis.createClient(parseInt(REDIS_PORT), REDIS_HOST);
    client.auth(REDIS_PASS);
    return client;
  }


  getRedisValue = async (req: any, key: string): Promise<ResponseType> => {
    
    const client: any = this.getRedisClient();

    const getRes: ResponseType = await new Promise(async (resolve) => {
      client.on('error', (err: any) => {
        const errMess = req.lang.redis.received.error;
        const stdErrMessage = err.message;
        const error: ResponseType = {
          result: this.error,
          message: errMess,
          status: 500,
          body: {
            stdErrMessage: stdErrMessage
          }
        };
        this.logger(this.redisError, errMess, {
          url: req.url,
          headers: req.headers,
          data: {
            key: key
          }
        }, err); 
        resolve(error)
      });
      const reply = await client.get(key);
      const result: ResponseType = (reply !== null)? {
        result: this.success,
        message: req.lang.redis.received.success,
        status: 200,
        body: {
          key: key,
          reply: reply
        }
      } : {
        result: this.warning,
        message: req.lang.redis.received.warning,
        status: 404,
        body: {
          key: key,
          reply: reply
        }
      }; 
      resolve(result);
    });

    this.closeClient(client); 
    return getRes;
  };

  delRedisValue = async (req: any, key: string): Promise<ResponseType> => {
    
    const client: any = this.getRedisClient();

    const saveRes: ResponseType = await new Promise(async (resolve) => {
      client.on('error', (err: any) => {
        const errMess = req.lang.redis.del.error;
        const stdErrMessage = err.message;
        const error: ResponseType = {
          result: this.error,
          message: errMess,
          status: 500,
          body: {
            stdErrMessage: stdErrMessage
          }
        };
        this.logger(this.redisError, errMess, {
          url: req.url,
          headers: req.headers,
          data: {
            key: key
          }
        }, err); 
        resolve(error)
      });
      const reply = await client.del(key);
      const result: ResponseType = {
        result: this.success,
        message: req.lang.redis.del.success,
        status: 201,
        body: {
          key: key,
          reply: reply
        }
      }; 
      resolve(result);
    });

    this.closeClient(client);
    return saveRes;
  };

  setRedisValue = async (req: any, key: string, value: string | number): Promise<ResponseType> => {
    
    const client: any = this.getRedisClient();

    const saveRes: ResponseType = await new Promise(async (resolve) => {
      client.on('error', (err: any) => {
        const errMess = req.lang.redis.save.error;
        const stdErrMessage = err.message;
        const error: ResponseType = {
          result: this.error,
          message: errMess,
          status: 500,
          body: {
            stdErrMessage: stdErrMessage
          }
        };
        this.logger(this.redisError, errMess, {
          url: req.url,
          headers: req.headers,
          data: {
            key: key,
            value: value
          }
        }, err); 
        resolve(error)
      });
      const reply = await client.set(key, value);
      const result: ResponseType = {
        result: this.success,
        message: req.lang.redis.save.success,
        status: 201,
        body: {
          key: key,
          value: value,
          reply: reply
        }
      }; 
      resolve(result);
    });

    this.closeClient(client);
    return saveRes;
  };

  closeClient = (client: any) => {
    client.end('close');
  }

  constructor() {
    super();
  }


}

export default Worker;