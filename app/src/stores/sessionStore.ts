import { createStore } from 'redux';

interface User {
  sessionLoad: boolean
}

const initialState: User = {
  sessionLoad: true
};

interface UserAction {
  type: string;
  payload: User;
}

const rootReducer = (state = initialState, action: UserAction): User => {
  switch (action.type) {
    case "SET_SESSION_LOAD": {
      return action.payload;
    }
    default:
      return state;
  }
};

const sessionStore = createStore(rootReducer);

export default sessionStore;