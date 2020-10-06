import { createStore } from 'redux';
import { Cookies } from 'react-cookie';

export interface Language {
  value?: string,
  links?: {
    registration: string,
    login: string,
    logout: string
    home: string
    private: string
  },
  form?: {
    name: string,
    email: string,
    password: string,
    passwordRepeat: string,
    save: string
    warning: {
      name: string
    }
  } 
}

const initialState: Language = require(`../locales/en/lang`).default;

export interface UserAction {
  type: string;
  payload: string;
}

const rootReducer = (state = initialState, action: UserAction): Language => {
  switch (action.type) {
    case "SET_LANGUAGE": {
      const cookies = new Cookies();
      cookies.set('user_lang', action.payload);
      let lang;
      try {
        lang = require(`../locales/${action.payload}/lang`).default;
      }
      catch(e) {
        lang = require(`../locales/en/lang`).default;
      }
      return lang;
    }
    default:
      return state;
  }
};

const langStore = createStore(rootReducer);

export default langStore;