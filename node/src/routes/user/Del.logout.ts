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

class Logout extends Worker implements RouterInterface {
  
  constructor() {
    super();
  }

  public handler = async (req: RequestType, res: any) => {

    const { JWT_SECRET }: any = process.env;

    const { usertoken } = req.headers;
    const { id } = req.params;

    const parsedToken: any = jwt.verify(usertoken, JWT_SECRET);

    let delRes: ResponseType;

    if (id !== parsedToken.id) {
      delRes = {
        result: this.warning,
        message: req.lang.user.data.id.error,
        status: 400,
        body: {}
      };
    }
    else {
      delRes = await this.delRedisValue(req, usertoken);
    }

    return await res.status(delRes.status).json(delRes);
  }
}

export default Logout;