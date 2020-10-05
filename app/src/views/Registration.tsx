import React, { useState, useEffect, useRef } from 'react';
import langStore, { Language } from '../stores/langStore';
import sessionStore from '../stores/sessionStore';
import userStore from '../stores/userStore';
import Worker, { RegistrationData } from '../lib/worker';
import { Cookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const cookies = new Cookies();

const w = new Worker();

function Registration() {

  const history = useHistory();

  const [ lang, setLang ] = useState(langStore.getState());
  const [ error, setError ] = useState(<div></div>);

  const name: any = useRef();
  const email: any = useRef();
  const password: any = useRef();
  const passwordRepeat: any = useRef();

  const registration = async () => {
    const data: RegistrationData = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      passwordRepeat: passwordRepeat.current.value
    }
    if (data.name === '') {
      setError(<div className={`err warning`}>{lang.form?.warning.name}</div>);
      return;
    }
    const res: any = await w.registration(data);
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
      if (history.location.pathname !== '/login') {
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
      if (_isMounted) setLang(langStore.getState())
    });

    sessionStore.subscribe(() => {
      w.redirect(history);
    });

    return () => _isMounted = false;
  });

  return (
    <div className="container col center">
      <h1>{ lang.links?.registration }</h1>
      <div className="item">
      <div className="label">{lang.form?.name}</div>
        <input
          ref={name} 
          type="text" 
          className="input"
        ></input>
      </div>
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
      <div className="item">
      <div className="label">{lang.form?.passwordRepeat}</div>
        <input
          ref={passwordRepeat} 
          type="password" 
          className="input"
        ></input>
      </div>
      <div className="item">
      <div 
        className='button'
        onClick={registration}
      >{lang.links?.registration}</div>
      </div>
      <div className="error-field">{error}</div>
    </div>
  );
}

export default Registration;