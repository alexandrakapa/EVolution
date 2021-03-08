import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards1'>
      <h1 style= {{
              fontSize:'40px',
              textAlign: 'center',
              color: 'black',
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
              src="https://www.w3schools.com/images/picture.jpg"
              text='Charging sessions'
              label='Report'
              path='/main/charging_sessions'
            />
            <CardItem
              src="https://www.w3schools.com/images/picture.jpg"
              text='Mean energy cost'
              label='Reports and statisitcs'
              path='/main/mean_energy_cost'
            />
             <CardItem
              src="https://www.w3schools.com/images/picture.jpg"
              text='Energy Consumption'
              label='Report and statisitcs'
              path='/main/energy_consumption_report'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
