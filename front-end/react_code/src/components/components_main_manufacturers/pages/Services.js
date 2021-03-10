import React from 'react';
import '../../Background.css';

export default function Profile() {
  var textStyle = {
  position: 'absolute',
  fontSize: '100px',
  top: '44%',
  left: '10%',
  color: 'white'
};
  return ( <div>
                <h1
                  className='services12'>
                </h1>
                <h1 style={textStyle}>Services</h1>
            </div>);
}
