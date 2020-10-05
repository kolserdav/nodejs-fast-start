import { 
  MiddlewareInterface, 
  ResponseType,
  RequestType 
} from '../types';
import Worker from '../lib/Worker';

class Auth extends Worker implements MiddlewareInterface {
  
  constructor() {
    super();
  }

  handler = async (req: RequestType, res: any, next: any) => {
    
    const result: ResponseType = {
      result: this.error,
      status: 403,
      message: req.lang.auth.access.error,
      body: {}
    }
 
    return await res.status(403).json(result)
  };
}

export default Auth;