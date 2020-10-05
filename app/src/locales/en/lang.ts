import { Language } from '../../stores/langStore';

const lang: Language = {
  value: "en",
  links: {
    registration: 'Registration',
    login: 'Login',
    logout: 'Logout',
    home: 'Home',
    private: 'Personal Area'
  },
  form: {
    name: 'Name',
    email: 'Email',
    password: 'Password',
    passwordRepeat: 'Password repeat',
    warning: {
      name: 'Enter your name'
    }
  }
};

export default lang;