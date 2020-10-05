import GetUserByID from './user/Get.user-by-id';
import CreateUser from './user/Post.createUser';
import Login from './user/Post.login';
import GetAuth from './user/Get.auth';
import Logout from './user/Del.logout';

class Router {
  user = {
    GetUserByID: new GetUserByID().handler,
    CreateUser: new CreateUser().handler,
    Login: new Login().handler,
    GetAuth: new GetAuth().handler,
    Logout: new Logout().handler
  }
}

export default Router;