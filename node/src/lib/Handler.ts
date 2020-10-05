
import { 
  HandlerInterface, 
  LangType, 
  ResultType, 
  LoggerDataType } from '../types';

  import path from 'path';

class Handler implements HandlerInterface {

  public success: ResultType;
  public warning: ResultType;
  public error: ResultType;

  constructor() {
    this.success = 'success';
    this.warning = 'warning';
    this.error = 'error';
  }

  public getLang = (req: any) => {
    let language: LangType;
    const lang: string = req.headers.userlang;
    try {
      language = require(path.resolve(__dirname, `../locales/${lang}/lang`)).default;
    }
    catch(e) {
      language = require(path.resolve(__dirname, `../locales/en/lang`)).default;
    }
    return language;
  }

  public logger = (type: string, message: string, data: LoggerDataType, stdErr: any) => {
    console.log(type, message, data, stdErr );
  }
}

export default Handler;