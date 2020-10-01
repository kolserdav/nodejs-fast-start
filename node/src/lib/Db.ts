import UserModel from '../schemas/user.schema';
import { ResponseType } from '../types/router'; 
import { LangType } from '../types/handler';
import Handler from '../lib/Handler';

class Db extends Handler {
  
  dbError = 'ERROR';
  db: any;

  constructor() {
    super();
  }

  public getUserById = async (req: any, id: string): Promise<ResponseType> => {
    const lang: LangType = this.getLang(req.headers.userlang);
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
            id: id,
            url: req.url,
            headers: req.headers
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