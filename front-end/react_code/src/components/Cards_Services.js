import React from 'react';
import './Cards_Services.css';
import CardItemService from './CardItem_Services';

function CardsServices() {
  return (
    <div className='cards11'>
      <h1 className='h1_new1'>Our Services </h1>
      <div className='cards__container11'>
        <div className='cards__wrapper11'>
          <ul className='cards__items11'>
            <CardItemService
              src="https://cdn.skoda-storyboard.com/2019/05/190517-Comprehensive-update-for-%C5%A0KODA-Connect-App-users-2560x1706.jpg"
              text='Car Owners'
            />
            <CardItemService
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ORpvkyuLxAUel20nH5QPJh20w7tVY41HGA&usqp=CAU"
              text='Energy Suppliers'
            />
            <CardItemService
              src="https://cdn1.vogel.de/unsafe/1200x0/smart/images.vogel.de/vogelonline/bdb/1721800/1721805/original.jpg"
              text='Car Manufacturers'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardsServices;
