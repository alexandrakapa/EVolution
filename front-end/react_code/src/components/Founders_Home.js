import React from 'react';
import './MainSuppliers.css';
import Cards3 from './components_main_suppliers/Cards3';
import NavbarHome from './NavbarHome';
import './Background.css';


export default function Services() {

  return ( <div>
      <NavbarHome/>
      <div className='founders' >
                <Cards3 />
            </div>
        </div>);
}
