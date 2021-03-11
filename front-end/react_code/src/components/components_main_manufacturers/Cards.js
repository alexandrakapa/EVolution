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
              src="https://cdn.motor1.com/images/mgl/NAQXn/s1/electric-car-charging-at-station-with-wind-turbines-in-background.jpg"
              text='Charging sessions'
              label='Report'
              path='/mainman/charging_sessions'
            />
            <CardItem
              src="https://images.hgmsites.net/hug/bmw-inext-concept_100670744_h.jpg"
              text='Mean energy cost'
              label='Reports and statisitcs'
              path='/mainman/mean_energy_cost'
            />
             <CardItem
              src="https://jooinn.com/images/electric-pole-1.png"
              text='Energy Consumption'
              label='Report and statisitcs'
              path='/mainman/energy_consumption_report'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
