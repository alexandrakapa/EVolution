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
              src="https://www.proactiveinvestors.com.au/thumbs/upload/News/Image/2020_10/1200z740_1602132093_Cartoon-electric-car-being-recharged.jpg"
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
