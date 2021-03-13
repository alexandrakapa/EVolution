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
              src="https://scontent.fath3-4.fna.fbcdn.net/v/t1.0-9/159653659_5370541429653478_8039614882833677267_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=fsFjtT7R-DsAX9GAr0I&_nc_ht=scontent.fath3-4.fna&oh=8557c4c202c38ae39215057cc647cd76&oe=606F4BC0"
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
              src="https://scontent.fath3-3.fna.fbcdn.net/v/t1.0-9/117646155_616482952341708_5095140044217577436_o.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Yt-7P2uTg5MAX8IW8aI&_nc_ht=scontent.fath3-3.fna&oh=59316ddd1e53fef3c46817a129a4fbc9&oe=60704E85"
              text='Stela Zhara'
              path='https://github.com/stelazr'
            />
            <CardItem2
              src="https://scontent.fath3-4.fna.fbcdn.net/v/t1.0-1/p480x480/48422220_1184394105041319_6651669263528493056_o.jpg?_nc_cat=102&ccb=1-3&_nc_sid=7206a8&_nc_ohc=iMn8tBA2wH8AX8B0kW9&_nc_ht=scontent.fath3-4.fna&tp=6&oh=051eebb91d05fa6a145b722cbd675570&oe=6071BCAA"
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
