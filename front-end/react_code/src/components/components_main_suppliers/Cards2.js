import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards2() {
  return (
    <div className='cards'>
      <h1 style= {{
              fontSize:'40px',
              textAlign: 'center',
              color: 'white'
          }}>Energy Consumption </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src="https://cdn.group.renault.com/ren/master/renault-new-cars/editorial/discover-renault/renault-editorial-discover-046.jpg.ximg.xsmall.jpg/1538737195256.jpg"
              text='Energy Consumption Per District'
              label='Data'
              path='/main/energy_consumption_per_district'
            />
            <CardItem
              src="https://mindmatters.ai/wp-content/uploads/sites/2/2021/03/electric-vehicle-of-the-future-using-smart-electric-car-charging-station-at-home-frontal-perspective-stockpack-adobe-stock-scaled.jpg"
              text='Energy Consumption Per Station'
              label='Data'
              path='/main/energy_consumption_per_station'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards2;
