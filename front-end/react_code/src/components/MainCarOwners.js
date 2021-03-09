import React from 'react';
import Navbar from './components_main_car_owners/Navbar';
import './MainCarOwners.css';
import Home from './components_main_manufacturers/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components_main_car_owners/pages/Services';
import Profile from './components_main_car_owners/pages/Profile';
import ContactUs from './ContactUs';
import SignInPage from './SignInPage';
import ChargingSessions from './components_main_manufacturers/pages/ChargingSessionsPerManufacturer';
import MeanCostPerCar from './components_main_manufacturers/pages/MeanCostPerCar';
import Founders from './Founders';
import ChargeNow from './components_main_car_owners/pages/ChargeNow';
import ChargeInProgress from './components_main_car_owners/pages/ChargeInProgress';

function MainCarOwners() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/main' exact component={Home} />
        <Route path='/main/services' component={Services} />
        <Route path='/main/profile' component={Profile} />
        <Route path='/main/contact_us' component={ContactUs} />
        <Route path='/sign_in' component={SignInPage} />
        <Route path='/main/charging_sessions' component={ChargingSessions} />
        <Route path='/main/charging' component={ChargeNow} />
        <Route path='/main/founders' component={Founders} />
         <Route path='/main/charging_in_progress' component={ChargeInProgress} />
      </Switch>
    </Router>
  );
}

export default MainCarOwners;
