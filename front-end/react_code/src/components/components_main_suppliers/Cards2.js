import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards2() {
  return (
    <div className='cards'>
      <h1>Energy Consumption </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src="https://www.w3schools.com/images/picture.jpg"
              text='Energy Consumption Per District'
              label='Data'
              path='/main/energy_consumption_per_district'
            />
            <CardItem
              src="https://www.w3schools.com/images/picture.jpg"
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
