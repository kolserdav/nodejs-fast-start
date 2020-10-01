import ServerInterface from './types/server';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Router from './routes/Router';
import fs from 'fs';
import path from 'path';
import https from 'https';
import Worker from './lib/Worker';
import logger from './lib/logger';


dotenv.config();

const {
  MONGO_DB_HOST,
  SERVER_PORT
}: any = process.env;

class Server extends Worker implements ServerInterface {

  constructor() {
    super();
  }
  
  private setRoutes(app: any): void {
    const router = new Router();
    app.get('/u/:id', router.user.GetUserByID);
    
    return app;
  }

  private setUpApp(app: any): void {
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(cors());
    return app;
  }

  private setUpDatabase(): void {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(MONGO_DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  private setErrorHandlers() {
    process.on('uncaughtException', (err: any, origin: any) => {
      console.log(1, err)
      console.log(2, origin)
    });
    process.on('unhandledRejection', (reason: any, promise: any) => {
      logger('UNHANDLED_REJECTION', 'Error', {}, reason);
    });
  }

  private setSettings(app: any): any {
    this.setUpDatabase();   
    this.setErrorHandlers();
    let res = this.setUpApp(app);
    return this.setRoutes(res);
  }

  public startHttps() {
    const app = this.setSettings(express());
    const privateKey = fs.readFileSync(path.resolve(__dirname, '../resources/ssl/server-key.pem'), 'utf8');
    const certificate = fs.readFileSync(path.resolve(__dirname, '../resources/ssl/server-cert.pem'), 'utf8');
    https.createServer({
      key: privateKey,
      cert: certificate,
    }, app)
      .listen(SERVER_PORT, () => {
        `Running server on port ${SERVER_PORT}. Protocol: HTTPS.`
      })
  }

  public start() {
    const app = this.setSettings(express());
    app.listen(SERVER_PORT, () => {
      console.log(`Running server on port ${SERVER_PORT}. Protocol: HTTP`);
    });
  }

}

export { Server };