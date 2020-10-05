import { 
  LangType, 
  RequestType 
} from '../types';
import Worker from '../lib/Worker';

class Lang extends Worker {
  
  constructor() {
    super();
  }

  handler = async (req: RequestType, res: any, next: any) => {
    
    const lang: LangType = this.getLang(req);
    req.lang = lang;  
    next();
  };
}

export default Lang;