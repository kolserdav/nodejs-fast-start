/*
  Get user for id
  /u/:id GET
*/

import { LangType } from '../../types/handler';
import { RouterInterface, ResponseType } from '../../types/router';
import Worker from '../../lib/Worker';

class GetUserByID extends Worker implements RouterInterface {
  
  constructor() {
    super();
  }

  public handler = async (req: any, res: any) => {
    
    const lang: LangType = this.getLang(req.headers.userlang);

    const { id } = req.params;

    const user: ResponseType = await this.getUserById(req, id);

    return await res.status(user.status).json(user);
  }
}

export default GetUserByID;