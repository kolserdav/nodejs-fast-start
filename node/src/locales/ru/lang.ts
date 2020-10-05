import { LangType } from '../../types/index';

const { MIN_PASSWORD_LENGTH }: any = process.env;

const lang: LangType = {
  user: {
    received: {
      success: "Пользователь получен",
      error: "Ошибка при получении пользователя",
      warning: "Пользователь не найден"
    },
    create: {
      success: "Пользователь создан",
      error: "Ошибка при создании пользователя",
      warning: "Данный емайл был зарегистрирован ранее"
    },
    data: {
      password: {
        error: 'Пароли не совпадают',
        short: `Пароль не может быть короче чем ${MIN_PASSWORD_LENGTH} символов`
      },
      id: {
        error: 'Переданные данные пользователя не соответствуют сохраненным'
      }
    },
    login: {
      error: 'Ошибка при входе',
      warning: 'Логин и пароль не совпадают',
      success: 'Успешный вход'
    }
  },
  redis: {
    received: {
      error: "Ошибка при получении кеша",
      warning: "На данное событие кеш не найден",
      success: "Кеш успешно получен" 
    },
    save: {
      error: "Ошибка сохранения в кеш",
      warning: "",
      success: "Успешное сохранение данных в кеш"
    },
    del: {
      error: "Ошибка удаления из кеша",
      warning: "",
      success: "Успешное удаление из кеша"
    }
  },
  auth: {
    access: {
      error: "Доступ к данному ресурсу запрещен",
      warning: "Недостаточно прав",
      success: "Доступ получен"
    }
  }
};

export default lang;