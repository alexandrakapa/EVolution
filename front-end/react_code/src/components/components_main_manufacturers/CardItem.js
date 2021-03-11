import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  console.log(props.src);
  return (
    <>
      <li className='cards__item1'>
        <Link className='cards__item__link1' to={props.path}>
          <figure className='cards__item__pic-wrap1' data-category={props.label}>
            <img
              className='cards__item__img1'
              alt='Statistics Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info1'>
            <h5 className='cards__item__text1'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
