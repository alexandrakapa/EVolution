import React, { Component } from 'react';
import SignIn from './SignIn'

//import Cookies from 'universal-cookie';
//import * as ROUTES from '../../constants/routes';
//const cookies = new Cookies();
//const ->unchanged
function SignInPage(props){
  console.log("hi");
  console.log(props.setUserData);
  console.log("hi");
  return (
  <div>
    <h1>Sign In</h1>
    <SignIn setUserData={props.setUserData} />
  </div>
)
};

export default SignInPage;
// export { SignInForm };
