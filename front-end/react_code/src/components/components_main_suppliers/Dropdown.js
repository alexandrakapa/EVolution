import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import  Dropdown2 from './Dropdown2';

import './Dropdown.css';
import { Link } from 'react-router-dom';

function Dropdown() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          console.log(index);
          if(index==0){
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        }
        else if( index==1){
          return(
          <li key={index}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          >
            <div
              className={item.cName}
              onClick={closeMobileMenu}
            >
              Energy Consumption <i className='fas fa-caret-down' />
            </div>
            {dropdown && <Dropdown2 />}
          </li>
        );
        }
        })}
      </ul>
    </>
  );
}

export default Dropdown;
