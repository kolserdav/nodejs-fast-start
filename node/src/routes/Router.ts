import GetUserByID from './user/Get.user-by-id';

class Router {
  user = {
    GetUserByID: new GetUserByID().handler
  }
}

export default Router;