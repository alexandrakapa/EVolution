import React from 'react';
import Navbar from './components_main/Navbar';
import './Main.css';
import Home from './components_main/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components_main/pages/Services';
import Profile from './components_main/pages/Profile';
import ContactUs from './components_main/pages/ContactUs';
import SignInPage from './SignInPage';
import Marketing from './components_main/pages/Marketing';
import Consulting from './components_main/pages/Consulting';

function Main() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/main' exact component={Home} />
        <Route path='/main/services' component={Services} />
        <Route path='/main/profile' component={Profile} />
        <Route path='/main/contact-us' component={ContactUs} />
        <Route path='/sign_in' component={SignInPage} />
        <Route path='/main/marketing' component={Marketing} />
        <Route path='/main/consulting' component={Consulting} />
      </Switch>
    </Router>
  );
}

export default Main;
