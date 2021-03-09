import React from 'react';
import CardsServices from './Cards_Services';
import NavbarHome from './NavbarHome';


export default function Services() {

  return (
<div>
    <NavbarHome />
      <div style= {{ marginTop:'5vh' }} >
          <CardsServices />
      </div>
</div>);
}
