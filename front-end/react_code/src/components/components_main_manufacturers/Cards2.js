import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards2() {
  return (
    <div className='cards1'>
      <h1 style= {{
              fontSize:'40px',
              textAlign: 'center',
              color: 'black',
              paddingBottom : '40px',
              borderBottom: '5px solid rgba(200, 247, 197, 0.62)',
              width: '400px',
              height: '130px',
              margin: '0 auto'
          }} >Mean energy cost per km </h1>
      <div className='cards__container1'>
        <div className='cards__wrapper1'>
          <ul className='cards__items1'>
            <CardItem
              src="https://www.w3schools.com/images/picture.jpg"
              text='For your car models'
              label='Report'
              path='/main/mean_energy_cost_per_car'
            />
            <CardItem
              src="https://www.w3schools.com/images/picture.jpg"
              text='General statisitcs'
              label='Report and diagram'
              path='/main/mean_energy_cost_statistics'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards2;
