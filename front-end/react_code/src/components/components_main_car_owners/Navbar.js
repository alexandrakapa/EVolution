import React, { useState,useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
// transfers sessionStorage from one tab to another

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const logMeOut = () => {
    console.log("here logging out");
    setClick(false);
    const fetch = require('node-fetch');
    const tok = localStorage.getItem('token');
    console.log(tok);

    fetch('http://localhost:8765/evcharge/api/logout',{
       method: 'POST',
       headers:{'Content-type':'application/json','x-access-token':tok}
     }).then(function(response){
      console.log("HERE: "+response.status);
      localStorage.clear();
      window.location.href = "http://localhost:3000";
     })
       .catch(err => console.log(err));
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);


  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/mainown' className='navbar-logo' onClick={closeMobileMenu}>
          EVolution
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/mainown' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/mainown/services'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Services <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/mainown/profile'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              MyProfile
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/mainown/contact_us'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
        </ul>
        {button && <Button index='0'  onClick={logMeOut}>Sign Out</Button>}
      </nav>
    </>
  );
}

export default Navbar;
