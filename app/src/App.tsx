import React, { useEffect } from 'react';
import './scss/App.scss';
import Worker from './lib/worker';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Cookies } from 'react-cookie';
import langStore from './stores/langStore';
import userStore from './stores/userStore';
import sessionStore from './stores/sessionStore';

import Registration from './views/Registration';
import Login from './views/Login';
import Logout from './views/Logout';
import Home from './views/Home';
import Private from './views/Private';

import Navbar from './components/Navbar';

const w = new Worker();

interface AppInterface {
 
}

window.addEventListener('resize', () => {
  console.log(document.querySelector('body')?.clientWidth);
})

const cookies = new Cookies();

function App(props: AppInterface) {

  useEffect(() => {
    const langValue = cookies.get('user_lang') || navigator.language;
    langStore.dispatch({
      type: 'SET_LANGUAGE',
      payload: langValue
    });

    const res: any = w.getAuth();
    res.then((d: any) => {
      if (d.status === 200) {
        userStore.dispatch({
          type: 'SET_USER',
          payload: {
            id: d.body.user._id,
            email: d.body.user.email,
            name: d.body.user.name
          }
        });
      }
      sessionStore.dispatch({
        type: 'SET_SESSION_LOAD',
        payload: {
          sessionLoad: false
        }
      });
    })
  });

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/my">
          <Private />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </ Router>
  );
}

export default App;
