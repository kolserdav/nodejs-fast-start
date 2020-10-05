/*
  Get user for id
  /u/:id GET
*/

import { 
  RouterInterface, 
  ResponseType,
  RequestType  
} from '../../types';
import Worker from '../../lib/Worker';

class GetUserByID extends Worker implements RouterInterface {
  
  constructor() {
    super();
  }

  public handler = async (req: RequestType, res: any) => {

    const { id } = req.params;

    const r = await this.getRedisValue(req, "dss");

    const user: ResponseType = await this.getUserById(req, id);

    return await res.status(user.status).json(user);
  }
}

export default GetUserByID;