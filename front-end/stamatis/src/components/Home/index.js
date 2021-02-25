import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Home(){
const nikos=cookies.get('name')
return(
  <div>
  <h2>Welcome {nikos} </h2>
  </div>
)
};
export default Home;
