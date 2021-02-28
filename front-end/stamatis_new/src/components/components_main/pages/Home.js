import React from 'react';
import '../../Main.css';

export default function Home() {
var textStyle = {
position: 'absolute',
fontSize: '100px',
top: '40%',
left: '50%',
color: '#006400'
};
return ( <div>
              <h1
                className='home'>
              </h1>
              <h1 style={textStyle}>Welcome {localStorage.username}</h1>
          </div>);
}
