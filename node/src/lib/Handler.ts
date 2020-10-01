import { ResponseType } from '../types/router';
import { HandlerInterface, LangType, ResultType } from '../types/handler';

class Handler implements HandlerInterface {

  public success: ResultType;
  public warning: ResultType;
  public error: ResultType;

  constructor() {
    this.success = 'success';
    this.warning = 'warning';
    this.error = 'error';
  }

  public getLang = (lang: string) => {
    let language: LangType;
    try {
      language = require(`../locales/${lang}/lang.json`);
    }
    catch(e) {
      language = require(`../locales/en/lang.json`);
    }
    return language;
  }

  public logger = (type: string, message: string, data: any, stdErr: any) => {
    console.log(type, message, data, stdErr );
  }
}

export default Handler;