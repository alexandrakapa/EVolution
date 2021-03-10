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
              borderBottom: '3px solid white',
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_PZio4jXrJxQp1IjgMSja2g4raGeK-X7P-Q&usqp=CAU"
              text='Mean energy cost'
              label='Reports and statisitcs'
              path='/mainman/mean_energy_cost'
            />
             <CardItem
              src="https://www.smarthomecharge.co.uk/site/assets/files/1374/matthew-henry-yetqklnhsui-unsplash.500x350.jpg"
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
