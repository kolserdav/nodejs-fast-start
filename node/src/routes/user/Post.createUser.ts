/*
  Create user
  /u POST
*/

import { 
  RouterInterface, 
  ResponseType,
  RequestType  
} from '../../types';
import Worker from '../../lib/Worker';
import * as jwt from 'jsonwebtoken';

class CreateUser extends Worker implements RouterInterface {
  
  constructor() {
    super();
  }

  public handler = async (req: RequestType, res: any) => {

    const { MIN_PASSWORD_LENGTH, JWT_SECRET }: any = process.env;
    const { password, passwordRepeat } = req.body;
  
    if (password.length < parseInt(MIN_PASSWORD_LENGTH)) {
      const result: ResponseType = {
        result: this.warning,
        message: req.lang.user.data.password.short,
        status: 400,
        body: {
          password: password,
          passwordRepeat: passwordRepeat
        }
      };
      return await res.status(result.status).json(result);
    }

    if (password !== passwordRepeat) {
      const result: ResponseType = {
        result: this.warning,
        message: req.lang.user.data.password.error,
        status: 400,
        body: {
          password: password,
          passwordRepeat: passwordRepeat
        }
      };
      return await res.status(result.status).json(result);
    }

    let user = await this.getUserByEmail(req, req.body.email);

    if (user.status !== 404) {
      if (user.status === 200) {
        user.result = this.warning;
        user.status = 400;
        user.message = req.lang.user.create.warning;
        user.body = {
          email: req.body.email
        };
      }
      return await res.status(user.status).json(user); 
    }

    user = await this.createUser(req, req.body);

    if (user.result === this.error) {
      return await res.status(500).json(user);
    }

    const token = jwt.sign({
      id: user.body.user._id,
      email: user.body.user.email,
      password: user.body.user.password,
      userAgent: req.headers.userAgent
    }, JWT_SECRET)

    const saveRes: any = await this.setRedisValue(req, token, 1);

    if (saveRes.status !== 201) {
      return await res.status(saveRes.status).json(saveRes); 
    }

    user.body = {
      token: token,
      user: {
        id: user.body.user._id,
        name: user.body.user.name,
        email: user.body.user.email,
      }
    };

    return await res.status(user.status).json(user);
  }
}

export default CreateUser;