import React from 'react';
import '../../MainCarOwners.css';
import Footer from '../Footer';

export default function Home() {
var textStyle = {
position: 'absolute',
fontSize: '90px',
top: '60%',
left: '5%',
color: 'white'
};
var textStyle2 = {
position: 'absolute',
fontSize: '90px',
top: '70%',
left: '5%',
color: 'white'
};
return ( <div>
              <h1
                className='home_own'>
              </h1>
              <h1 style={textStyle} ><mark>Welcome</mark></h1>
              <h1 style={textStyle2}><mark>{localStorage.username}</mark></h1>

              <Footer />
          </div>);
}
