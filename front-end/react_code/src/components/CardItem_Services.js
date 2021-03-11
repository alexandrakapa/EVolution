import React from 'react';
import { Link } from 'react-router-dom';
import './Cards_Services.css';

function CardItemService(props) {
  console.log(props.src);
  return (
    <>
      <li className='cards__item11'>
        <a className='cards__item__link11' href={props.path}>
          <figure className='cards__item__pic-wrap11' data-category={props.label}>
            <img
              className='cards__item__img11'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info11'>
            <h5 className='cards__item__text11'>{props.text}</h5>
            <p className='cards__item__subtext11'>{props.subtext}</p>
          </div>
        </a>
      </li>
    </>
  );
}

export default CardItemService;
