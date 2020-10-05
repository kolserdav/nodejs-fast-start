import { Cookies } from "react-cookie";
import userStore from '../stores/userStore';
import sessionStore from '../stores/sessionStore';

export type RegistrationData = {
  name: string,
  email: string,
  password: string,
  passwordRepeat: string
}

export type LoginData = {
  email: string,
  password: string,
}

const cookies = new Cookies();

class Worker {
  constructor() {}

  request(url: string, data: {}) {
    return new Promise((resolve, reject) => {
      fetch(url, data)
        .then(r => r.json())
        .then(d => {
          resolve(d);
        })
        .catch(e => {
          reject(e);
        })
    })
      .catch(e => {
        console.error(e);
      })
  }

  registration(data: RegistrationData) {
    return new Promise((resolve) => {
      this.request(`${window.origin.replace(':3000', '')}:3030/u`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userlang': new Cookies().get('user_lang')
        },
        body: JSON.stringify(data)
      })
        .then(d => {
          resolve(d);
        });
    });
  }

  login(data: LoginData) {
    return new Promise((resolve) => {
      this.request(`${window.origin.replace(':3000', '')}:3030/u/l`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userlang': new Cookies().get('user_lang')
        },
        body: JSON.stringify(data)
      })
        .then(d => {
          resolve(d);
        });
    });
  }

  logout() {
    return new Promise((resolve) => {
      this.request(`${window.origin.replace(':3000', '')}:3030/u/${userStore.getState().id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'userlang': new Cookies().get('user_lang'),
          'usertoken': cookies.get('user_token')
        }
      })
        .then(d => {
          resolve(d);
        });
    });
  }

  redirect(history: any, logout = false) {
    if (!logout) {
      if (userStore.getState().id !== '' && !sessionStore.getState().sessionLoad) history.push('/my');
      userStore.subscribe(() => {
        if (userStore.getState().id !== '') history.push('/my');
      });
    }
    else {
      if (userStore.getState().id === '' && !sessionStore.getState().sessionLoad) history.push('/login');
      userStore.subscribe(() => {
        if (userStore.getState().id === '') history.push('/login');
      });
    }
  }

  getAuth() {
    return new Promise((resolve) => {
      this.request(`${window.origin.replace(':3000', '')}:3030/u/a`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userlang': cookies.get('user_lang'),
          'usertoken': cookies.get('user_token')
        }
      })
        .then(d => {
          resolve(d);
        });
    });
  }
}

export default Worker;