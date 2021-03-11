import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1 style= {{
              fontSize:'40px',
              textAlign: 'center',
              color: 'white'
          }} >Our Services </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src="https://console.kr-asia.com/wp-content/uploads/2020/11/%E5%9B%BE%E8%99%AB%E5%88%9B%E6%84%8F-902720890664648719-scaled.jpeg"
              text='Energy Demand Forecast'
              label='Statisitcs'
              path='/mainsup/energy_demand_forecasts'
            />
            <CardItem
              src="https://console.kr-asia.com/wp-content/uploads/2019/06/Electric-Vehicles-Shutterstock-M-Size-2-1175x500.jpg"
              text='Energy Consumption'
              label='Data'
              path='/mainsup/energy_consumption'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
