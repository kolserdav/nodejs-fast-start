import { createStore } from 'redux';

export interface User {
  id: string
  email: string
  name: string
}

const initialState: User = {
  id: '',
  email: '',
  name: ''
};

export interface UserAction {
  type: string;
  payload: User;
}

const rootReducer = (state = initialState, action: UserAction): User => {
  switch (action.type) {
    case "SET_USER": {
      return action.payload;
    }
    default:
      return state;
  }
};

const userStore = createStore(rootReducer);

export default userStore;