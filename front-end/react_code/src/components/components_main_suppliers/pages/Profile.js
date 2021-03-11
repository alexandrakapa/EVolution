import React from 'react';
import '../../MainSuppliers.css';

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
                  className='profile'>
                </h1>
                <h1 style={textStyle}>Profile Info
                </h1>
            </div>);
}
