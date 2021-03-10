import React, { useState } from 'react';
import { MenuItems2 } from './MenuItems2';
import './Dropdown2.css';
import { Link } from 'react-router-dom';

function Dropdown2() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown21-menu clicked' : 'dropdown21-menu'}
      >
        {MenuItems2.map((item, index) => {
          console.log(index);
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
        })}
      </ul>
    </>
  );
}

export default Dropdown2;
