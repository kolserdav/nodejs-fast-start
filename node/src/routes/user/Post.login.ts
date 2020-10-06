/*
  Login user
  /u/l POST
*/

import { 
  RouterInterface, 
  ResponseType,
  RequestType  
} from '../../types';
import Worker from '../../lib/Worker';
import * as jwt from 'jsonwebtoken';

class Login extends Worker implements RouterInterface {
  
  constructor() {
    super();
  }

  public handler = async (req: RequestType, res: any) => {

    const { MIN_PASSWORD_LENGTH, JWT_SECRET }: any = process.env;
    const { password, save } = req.body;
    if (password.length < parseInt(MIN_PASSWORD_LENGTH)) {
      const result: ResponseType = {
        result: this.warning,
        message: req.lang.user.data.password.short,
        status: 400,
        body: {
          password: password
        }
      };
      return await res.status(result.status).json(result);
    }

    let user = await this.getUserByEmailAndPass(req, req.body.email, req.body.password);

    if (user.status !== 200) {
      return await res.status(user.status).json(user); 
    } 

    const token = jwt.sign({
      id: user.body.user._id,
      email: user.body.user.email,
      password: user.body.user.password,
      userAgent: req.headers.userAgent
    }, JWT_SECRET)

    let value = 0;
    let expire = false;
    if (save === true) {
      value = 1;
      expire = true;
    }
    const saveRes: any = await this.setRedisValue(req, token, value);

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

export default Login;