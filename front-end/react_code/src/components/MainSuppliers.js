import React from 'react';
import Navbar from './components_main_suppliers/Navbar';
import './MainManufacturers.css';
import Home from './components_main_suppliers/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components_main_suppliers/pages/Services';
import Profile from './components_main_suppliers/pages/Profile';
import ContactUs from './components_main_suppliers/pages/ContactUs';
import SignInPage from './SignInPage';
import ChargingSessions from './components_main_suppliers/pages/ChargingSessionsPerManufacturer';
import Consulting from './components_main_suppliers/pages/Consulting';

function MainSuppliers() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/main' exact component={Home} />
        <Route path='/main/services' component={Services} />
        <Route path='/main/profile' component={Profile} />
        <Route path='/main/contact-us' component={ContactUs} />
        <Route path='/sign_in' component={SignInPage} />
        <Route path='/main/charging_sessions' component={ChargingSessions} />
        <Route path='/main/consulting' component={Consulting} />
      </Switch>
    </Router>
  );
}

export default MainSuppliers;
