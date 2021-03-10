import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Switch, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import SignInPage from './SignInPage';
import MainManufacturers from './MainManufacturers';
import MainCarOwners from './MainCarOwners';
import MainSuppliers from './MainSuppliers';
import NavbarHome from './NavbarHome';
import Footer from './Footer_Home';
import ContactUs from './ContactUs';
import Founders from './Founders_Home';
import Slider from './slides/slide_components/Slider';
import images from './slides/images';
import Services from './Services_Home'



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


  // <div>
  //     <Router >
  //       <div >
  //         <Route path="/" exact render={ (props) => {
  //           return <div>
  //           <ul>
  //           <li>
  //           <h1>Καλωσήρθες {this.state.username === null? '' : this.state.username}!<br / ></h1>
  //           </li>
  //           <li>
  //           <Link to='/sign_in'>Sign In</Link>
  //           </li>
  //           </ul>
  //           </div>
  //         }
  //       }/>
  //         <Route path="/sign_in" exact render={ (setUserData) =>( <SignInPage setUserData={this.state.setUserData} />)} />
  //         <Route path="/main" render={this.renderProtectedComponent(MainSuppliers)} />
  //
  //
  //
  //       </div>
  //     </Router>
  // </div>

  // <Router>
  //   <NavbarHome/>
  //   <Switch>
  //     <Route path="/sign_in" exact render={ (setUserData) =>( <SignInPage setUserData={this.state.setUserData} />)} />
  //     <Route path='/main' render={this.renderProtectedComponent(MainSuppliers)} />
  //
  //   </Switch>
  // </Router>

  // <ul>
  // <li>
  // <h1>Καλωσήρθες {this.state.username === null? '' : this.state.username}!<br / ></h1>
  // </li>
  // <li>
  // <Link to='/sign_in'>Sign In</Link>
  // </li>
  // </ul>







  render() {
    return (

      <div>
          <Router >
            <div >
              <Route path="/" exact render={ (props) => {
                return <div >
                <NavbarHome/>
                 <Slider slides={images} />
                <Footer />
                </div>
              }
            }/>
            <Switch>
            <Route path='/contact_us' component={ContactUs} />
            <Route path='/founders' component={Founders} />
            <Route path='/services' component={Services} />
            </Switch>
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
