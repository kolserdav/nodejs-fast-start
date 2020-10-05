import React, { useRef, useEffect, useState } from 'react';
import MenuIcon from '../images/icons/menu.svg';
import { Link } from 'react-router-dom';
import langStore, { Language } from '../stores/langStore';
import userStore from '../stores/userStore';

function Navbar() {

  const initialLang: Language = {};

  const [ lang, setLang ] = useState(initialLang);
  const [ user, setUser ] = useState(false);

  const menu: any = useRef();
  const select: any = useRef();

  const handleClickMenu = (e: any) => {
    menu.current.classList.toggle('is-open');
  }

  const changeLang = (e: any) => {
    langStore.dispatch({ type: 'SET_LANGUAGE', payload: e.target.value});
  }

  useEffect(() => {
    langStore.subscribe(() => {
      select.current.value = langStore.getState().value;
      setLang(langStore.getState);
    });
    userStore.subscribe(() => {
      setUser(userStore.getState().id !== '');
    });
  })

  return (
    <div className="nav row center">
      <div className="left">
        <img 
          className="icon" 
          src={ MenuIcon } 
          alt="Menu"
          onClick={handleClickMenu} 
        />
      </div>
      <div className="right">
        <select 
          ref={select}
          className="lang-select"
          onChange={changeLang}
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>
      <div 
        ref={menu} 
        className="menu"
        onClick={handleClickMenu}
      >
        <div className="menu-body">
         <Link to="/home" className="link">
           <p className="menu-item">
            {lang.links?.home}
           </p>
         </Link>
          {!user? <div><Link className="link" to='/registration'>
            <p className="menu-item">
              {lang.links?.registration}
            </p>
          </Link>
          <Link className="link" to='/login'>
            <p className="menu-item">
              {lang.links?.login}
            </p>
          </Link></div> : <div>
          <Link to="/my" className="link">
            <p className="menu-item">
              {lang.links?.private}
            </p>
          </Link>
            <Link className="link" to="/logout">
              <p className="menu-item">{lang.links?.logout}</p>
            </Link></div>}
        </div>
      </div>
    </div>
  );
}

export default Navbar