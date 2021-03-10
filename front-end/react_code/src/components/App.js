import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import SignInPage from './SignInPage';
import MainManufacturers from './MainManufacturers';
import MainCarOwners from './MainCarOwners'
import MainSuppliers from './MainSuppliers'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.userData.token,
      username: props.userData.username,
      style: {
        backgroundColor:'#fff',
        height:'10vh'
      },
      setUserData: (token, username) => this.setState({
        token: token,
        username: username
      }),
    };
  }

  renderProtectedComponent(ProtectedComponent) {
    if (this.state.username !== null) {
      return  (props) => <ProtectedComponent {...props} />;
    }
    else {
      return (props) => <Redirect to='/sign_in' />;
    }
  }

  render() {
    return (
        <div>
            <Router >
              <div className='container'>
                <Route path="/" exact render={ (props) => {
                  return <div>
                  <ul>
                  <li>
                  <h1>Καλωσήρθες {this.state.username === null? '' : this.state.username}!<br / ></h1>
                  </li>
                  <li>
                  <Link to='/sign_in'>Sign In</Link>
                  </li>
                  </ul>
                  </div>
                }
              }/>
                <Route path="/sign_in" exact render={ (setUserData) =>( <SignInPage setUserData={this.state.setUserData} />)} />                <Route path="/mainsup" render={this.renderProtectedComponent(MainSuppliers)} />
                <Route path="/mainown" render={this.renderProtectedComponent(MainCarOwners)} />
                <Route path="/mainman" render={this.renderProtectedComponent(MainManufacturers)} />




              </div>
            </Router>
        </div>
    );
  }
}

export default App;
