import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards1'>
      <h1 style= {{
              fontSize:'40px',
              textAlign: 'center',
              color: 'white',
              paddingBottom : '40px',
              borderBottom: '5px solid rgba(200, 247, 197, 0.62)',
              width: '330px',
              height: '80px',
              margin: '0 auto'
          }} >Our Services </h1>
      <div className='cards__container1'>
        <div className='cards__wrapper1'>
          <ul className='cards__items1'>
            <CardItem
              src="https://scontent.fath3-4.fna.fbcdn.net/v/t1.0-9/160004791_3960702270655991_194178788410065607_o.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=tCQ0rynX_BgAX_L-joa&_nc_ht=scontent.fath3-4.fna&oh=137f086e6284893b1604177a2986dfea&oe=607026E6"
              text='Charge now'
              path='/mainown/charging'
            />
            <CardItem
              src="https://images.hgmsites.net/hug/bmw-inext-concept_100670744_h.jpg"
              text='Nearby stations'
              path='/mainown/map'
            />
             <CardItem
              src='https://payware.eu/wp-content/uploads/2019/07/computer-security-lock-and-payment-opt.jpg'
              text='Payment'
              path='/mainown/payment'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
