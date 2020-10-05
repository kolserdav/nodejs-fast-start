import UserModel from '../schemas/user.schema';
import { LangType, ResponseType, RegistrationData } from '../types';
import Handler from '../lib/Handler';
import sha256 from 'sha256';

class Db extends Handler {
  
  dbError = 'ERROR';
  db: any;

  constructor() {
    super();
  }

  public getUserById = async (req: any, id: string): Promise<ResponseType> => {
    const lang: LangType = this.getLang(req);
    return await new Promise(resolve => {
      UserModel.findOne({ _id: id }, (err: any, doc: any) => {
        if (err) {
          const errMess = lang.user.received.error;
          const errRes: ResponseType = {
            result: this.error,
            status: 500,
            message: errMess,
            body: {
              stdErrMessage: this.getMogooseError(err)
            }
          };
          this.logger(this.dbError, errMess, {
            url: req.url,
            headers: req.headers,
            data: {
              id: id,
            }
          }, err);
          resolve(errRes);
        }
        else {
          let result: ResponseType = (doc === null)? {
            result: this.warning,
            status: 404,
            message: lang.user.received.warning,
            body: {
              user: doc
            }
          } : {
            result: this.success,
            status: 200,
            message: lang.user.received.success,
            body: {
              user: doc
            }
          };
          resolve(result);
        }
      });
    });
  }

  public getUserByEmail = async (req: any, email: string): Promise<ResponseType> => {
    return await new Promise(resolve => {
      UserModel.findOne({ email: email }, (err: any, doc: any) => {
        if (err) {
          const errMess = req.lang.user.received.error;
          const errRes: ResponseType = {
            result: this.error,
            status: 500,
            message: errMess,
            body: {
              stdErrMessage: this.getMogooseError(err)
            }
          };
          this.logger(this.dbError, errMess, {
            url: req.url,
            headers: req.headers,
            data: {
              email: email,
            }
          }, err);
          resolve(errRes);
        }
        else {
          let result: ResponseType = (doc === null)? {
            result: this.warning,
            status: 404,
            message: req.lang.user.received.warning,
            body: {
              user: doc
            }
          } : {
            result: this.success,
            status: 200,
            message: req.lang.user.create.success,
            body: {
              user: doc
            }
          };
          resolve(result);
        }
      });
    });
  }

  public getUserByEmailAndPass = async (req: any, email: string, password: string): Promise<ResponseType> => {
    return await new Promise(resolve => {
      UserModel.findOne({ email: email, password: sha256(password) }, (err: any, doc: any) => {
        if (err) {
          const errMess = req.lang.user.login.error;
          const errRes: ResponseType = {
            result: this.error,
            status: 500,
            message: errMess,
            body: {
              stdErrMessage: this.getMogooseError(err)
            }
          };
          this.logger(this.dbError, errMess, {
            url: req.url,
            headers: req.headers,
            data: {
              email: email,
            }
          }, err);
          resolve(errRes);
        }
        else {
          let result: ResponseType = (doc === null)? {
            result: this.warning,
            status: 404,
            message: req.lang.user.login.warning,
            body: {
              user: doc
            }
          } : {
            result: this.success,
            status: 200,
            message: req.lang.user.login.success,
            body: {
              user: doc
            }
          };
          resolve(result);
        }
      });
    });
  }

  public createUser = async (req: any, data: RegistrationData): Promise<ResponseType> => {
    const lang: LangType = this.getLang(req);
    const timeNow = Date.now();
    data.password = sha256(data.password);
    data.createTime = timeNow;
    data.updateTime = timeNow;
    return await new Promise(resolve => {
      UserModel.create(data, (err: any, doc: any) => {
        if (err) {
          const errMess = lang.user.create.error;
          const errRes: ResponseType = {
            result: this.error,
            status: 500,
            message: errMess,
            body: {
              stdErrMessage: this.getMogooseError(err)
            }
          };
          this.logger(this.dbError, errMess, {
            url: req.url,
            headers: req.headers,
            data: data
          }, err);
          resolve(errRes);
        }
        else {
          let result: ResponseType = {
            result: this.success,
            status: 201,
            message: lang.user.create.success,
            body: {
              user: doc
            }
          };
          resolve(result);
        }
      });
    });
  }

  private getMogooseError = (mongooseError: any) => {
    let errMessage = '';
    if (mongooseError.errors) {
      for (let prop in mongooseError.errors) {
        errMessage = mongooseError.errors[prop].message;
      }
    }
    else {
      errMessage = mongooseError.errmsg;
    }
    errMessage = (errMessage === undefined)? mongooseError.message : errMessage;
    return errMessage;
  };

}

export default Db;