import React from 'react';
import CardsServices from './Cards_Services';
import NavbarHome from './NavbarHome';
import './Background.css'

export default function Services() {

  return (
<div>
    <NavbarHome />
      <div  className='services12' >
          <CardsServices />
      </div>
</div>);
}
