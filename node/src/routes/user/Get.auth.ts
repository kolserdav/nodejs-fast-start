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

class GetAuth extends Worker implements RouterInterface {

  constructor() {
    super();
  }

  public handler = async (req: RequestType, res: any) => {

    const { JWT_SECRET }: any = process.env;

    const getRes: any = await this.getRedisValue(req, req.headers.usertoken);

    if (getRes.status !== 200) {
      return await res.status(getRes.status).json(getRes); 
    }

    const parsedToken: any = jwt.verify(getRes.body.key, JWT_SECRET);

    const user = await this.getUserById(req, parsedToken.id);
    
    return await res.status(user.status).json(user);
  }
}

export default GetAuth;