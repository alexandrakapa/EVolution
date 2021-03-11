import React from 'react';
import './Cards3.css';
import CardItem2 from './CardItem2';

function Cards3() {
  return (
    <div className='cards_found' >
      <h1>Founders </h1>
      <div className='cards_found__container'>
        <div className='cards_found__wrapper'>
          <ul className='cards_found__items'>
            <CardItem2
              src="https://avatars.githubusercontent.com/u/64039583?s=460&u=042fdc6b0eb6b57a118dad63bd5bb48fd1939690&v=4"
              text='Stamatis Alexandropoulos'
              path='https://github.com/stamatisalex'
            />
            <CardItem2
              src="https://www.w3schools.com/images/picture.jpg"
              text='Polytimi Anna Gkotsi'
              path='https://github.com/PolyannaG'
            />
            <CardItem2
              src="https://avatars.githubusercontent.com/u/63066416?s=400&u=9882a916d8333baae752b808c4c9828108876db7&v=4"
              text='Alexandra Kaparou'
              path='https://github.com/alexandrakapa'
            />
          </ul>
          <ul className='cards_found__items'>
            <CardItem2
              src="https://avatars.githubusercontent.com/u/45352904?s=400&u=cf815953b4cef9819e16deeabac8859690afbbff&v=4"
              text='Nikolaos Giorgoulakis'
              path='https://github.com/nikosgio'
            />
            <CardItem2
              src="https://www.w3schools.com/images/picture.jpg"
              text='Stela Zhara'
              path='https://github.com/stelazr'
            />
            <CardItem2
              src="https://www.w3schools.com/images/picture.jpg"
              text='Aikaterini Liagka'
              path='https://github.com/LiagkaAikaterini'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards3;
