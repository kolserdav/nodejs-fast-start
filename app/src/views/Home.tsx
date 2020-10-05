import React, { useEffect, useState, useRef } from 'react';
import langStore, { Language } from '../stores/langStore';
import userStore from '../stores/userStore';
import Worker, { LoginData } from '../lib/worker';
import { Cookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const cookies = new Cookies();

const w = new Worker();

function Home() {

  const history = useHistory();

  const [ lang, setLang ] = useState(langStore.getState());


  useEffect((): any => {
    let _isMounted = true;
    langStore.subscribe(() => {
      if (_isMounted) setLang(langStore.getState());
    });
    return () => _isMounted = false;
  });

  return (
    <div className="container col center">
      <h1>{lang.links?.home}</h1>
    </div>
  );
}

export default Home;