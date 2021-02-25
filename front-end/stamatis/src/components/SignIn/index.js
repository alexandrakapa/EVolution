import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Cookies from 'universal-cookie';


import * as ROUTES from '../../constants/routes';
const cookies = new Cookies();
//const ->unchanged
const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
//component -> html object
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    // this.props.history.push(ROUTES.HOME);
    console.log("test");
    let empInfo={
      username:email,
       password:password
     };
    console.log(empInfo);
    var getemail= JSON.stringify(empInfo);
    console.log(getemail);


    const fetch = require('node-fetch');

    fetch('http://localhost:8765/login',{
       method: 'POST',
       body: JSON.stringify(empInfo),
       headers:{'Content-type':'application/json'}
     }).then(res => res.json() )
       // .then(json => console.log(json))
       .then( json => { if(json.accessToken!=="" && json.isAuth !== false) {
         cookies.set('name',json.username, { path: '/' });
         cookies.set('token',json.accessToken, { path: '/' });
         this.props.history.push(ROUTES.HOME)
       }
       else{
         //this.props.history.push(ROUTES.SIGNIN)
         console.log("Error")
       }
     }
      )
       .catch(err => console.log(err));


    //console.log("hi");
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
//render -> φορτώνει αντικείμενα
  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

//router -> βιβλιοθήκη που κάνει τα routes δλδ συνδεέι τα links μεταξύ τους
// H SignInFormBase παίρνει απο το withRouter
//compose -> συνδεση συναρτησεων της withRouter με το SignInFormBase
//ενισχυω τη δευτερη παρενθεση με οτι εχει η πρωτη παρενθεση
const SignInForm = compose(
  withRouter,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };
