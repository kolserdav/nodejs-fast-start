import { Language } from '../../stores/langStore';

const lang: Language = {
  value: 'ru',
  links: {
    registration: 'Регистрация',
    login: 'Вход',
    logout: 'Выйти',
    home: 'Главная',
    private: 'Личный кабинет'
  },
  form: {
    name: 'Имя',
    email: 'Емайл',
    password: 'Пароль',
    passwordRepeat: 'Повтор пароля',
    warning: {
      name: 'Введите ваше имя'
    }
  }
};

export default lang;