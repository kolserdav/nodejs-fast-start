import React, { useEffect, useState, useRef } from 'react';
import langStore, { Language } from '../stores/langStore';
import sessionStore from '../stores/sessionStore';
import userStore from '../stores/userStore';
import Worker, { LoginData } from '../lib/worker';
import { Cookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const cookies = new Cookies();

const w = new Worker();

function Login() {

  const history = useHistory();

  const [ lang, setLang ] = useState(langStore.getState());
  const [ error, setError ] = useState(<div></div>);

  const email: any = useRef();
  const password: any = useRef();
  const save: any = useRef();

  const login = async () => {
    const data: LoginData = {
      email: email.current.value,
      password: password.current.value,
      save: save.current.checked
    }
    const res: any = await w.login(data);
    if (res.result === 'success') {
      cookies.set('user_token', res.body.token);
      userStore.dispatch({
        type: 'SET_USER',
        payload: {
          id: res.body.user.id,
          email: res.body.user.email,
          name: res.body.user.name
        }
      });
      if (history.location.pathname !== '/registration') {
        history.goBack();
      }
      else {
        history.push('/my');
      }
    }
    else {
      setError(<div className={`err ${res.result}`} title={res.body.stdErrMessage}>{res.message}</div>);
    }
  };

  useEffect((): any => {
    let _isMounted = true;
    langStore.subscribe(() => {
      if (_isMounted) setLang(langStore.getState());
    });

    sessionStore.subscribe(() => {
      w.redirect(history);
    });

    return () => _isMounted = false;
  });

  return (
    <div className="container col center">
      <h1>{lang.links?.login}</h1>
      <div className="item">
        <div className="label">{lang.form?.email}</div>
        <input
          ref={email} 
          type="email" 
          className="input"
        ></input>
      </div>
      <div className="item">
        <div className="label">{lang.form?.password}</div>
        <input
          ref={password} 
          type="password" 
          className="input"
        ></input>
      </div>
      <div className="item row center">
        <div className="label">{lang.form?.save}</div>
        <input
          ref={save} 
          type="checkbox" 
          className="input short"
        ></input>
      </div>
      <div className="item">
        <div
          onClick={login} 
          className='button'
        >{lang.links?.login}</div>
      </div>
      <div className="error-field">{error}</div>
    </div>
  );
}

export default Login;