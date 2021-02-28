import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "./marginer/index.jsx";

class SignIn extends Component {
  constructor(props) {
    super(props);
  //  this.props=props;
    this.state = { email: '',
    password: '',
    error: null};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = event => {
    const { email, password } = this.state;
    // this.props.history.push(ROUTES.HOME);
    console.log("test");
    console.log(this.props.setUserData);
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
       .then( json => {
        if(json.accessToken!=="" && json.isAuth !== false) {
         localStorage.setItem('token', json.accessToken);
         localStorage.setItem('username',json.username);
         console.log(json.accessToken, json.username);
          this.props.setUserData(json.accessToken, json.username);
          this.props.history.push('/main');
      }
       else{
         alert("Non valid username or password");
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

    //const isInvalid = password === '' || email === '';

    return (
      <BoxContainer>

      <FormContainer onSubmit={this.onSubmit}>

        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />

    <Marginer direction="vertical" margin={10} />
    <MutedLink href="#">Forget your password?</MutedLink>
    <Marginer direction="vertical" margin="1.6em" />
    <SubmitButton type="submit">Sign in</SubmitButton>
    <Marginer direction="vertical" margin="1em" />
{error && <p>{error.message}</p>}
</FormContainer>
    </BoxContainer>
    );
  }
}

//router -> βιβλιοθήκη που κάνει τα routes δλδ συνδεέι τα links μεταξύ τους
// H SignInFormBase παίρνει απο το withRouter
//compose -> συνδεση συναρτησεων της withRouter με το SignInFormBase
//ενισχυω τη δευτερη παρενθεση με οτι εχει η πρωτη παρενθεση

// const SignIn = compose(
//   withRouter,
// )(SignIn);

export default withRouter(SignIn) ;
