import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards2() {
  return (
    <div className='cards1'>
      <h1 style= {{
              fontSize:'40px',
              textAlign: 'center',
              color: 'white',
              paddingBottom : '40px',
              borderBottom: '5px solid rgba(200, 247, 197, 0.62)',
              width: '400px',
              height: '110px',
              margin: '0 auto'
          }} >Mean energy cost per km </h1>
      <div className='cards__container1'>
        <div className='cards__wrapper1'>
          <ul className='cards__items1'>
            <CardItem
              src="https://wallpaperaccess.com/full/223836.jpg"
              text='For your car models'
              label='Report'
              path='/mainman/mean_energy_cost_per_car'
            />
            <CardItem
              src="https://theimpacteconomy.files.wordpress.com/2020/07/tesla_the_nieuw_economy.jpg"
              text='General statisitcs'
              label='Report and diagram'
              path='/mainman/mean_energy_cost_statistics'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards2;
