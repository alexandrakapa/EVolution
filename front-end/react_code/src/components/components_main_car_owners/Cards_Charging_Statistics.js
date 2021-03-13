import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function CardsChargingStatistics() {
  return (
    <div className='cards'>
      <h1 style= {{
              fontSize:'40px',
              textAlign: 'center',
              color: 'white'
          }}>Charging Statistics </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src="https://c4.wallpaperflare.com/wallpaper/210/304/64/dark-road-sky-landscape-asphalt-hd-wallpaper-preview.jpg"
              text='Km Charging Statistics'
              path='/mainown/charging_statistics_km'
            />
            <CardItem
              src="https://wallpapercave.com/wp/wp2450863.jpg"
              text='Price Charging Statistics'
              path='/mainown/charging_statistics_price'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardsChargingStatistics;
