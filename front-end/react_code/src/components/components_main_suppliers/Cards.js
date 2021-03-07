import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1 style= {{
              fontSize:'40px',
              textAlign: 'center',
              color: 'black'
          }} >Our Services </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src="https://www.w3schools.com/images/picture.jpg"
              text='Energy Demand Forecast'
              label='Statisitcs'
              path='/main/energy_demand_forecasts'
            />
            <CardItem
              src="https://www.w3schools.com/images/picture.jpg"
              text='Energy Consumption'
              label='Data'
              path='/main/energy_consumption'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
