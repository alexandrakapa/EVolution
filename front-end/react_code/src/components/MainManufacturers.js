import React from 'react';
import Navbar from './components_main_manufacturers/Navbar';
import './MainManufacturers.css';
import Home from './components_main_manufacturers/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components_main_manufacturers/pages/Services';
import Profile from './components_main_manufacturers/pages/Profile';
import ContactUs from './components_main_manufacturers/ContactUs';
import SignInPage from './SignInPage';
import ChargingSessions from './components_main_manufacturers/pages/ChargingSessionsPerManufacturer';
import MeanCostPerCar from './components_main_manufacturers/pages/MeanCostPerCar';
import MeanCostTotal from './components_main_manufacturers/pages/MeanCostTotal';
import EnergyConsumption from './components_main_manufacturers/pages/EnergyConsumption';
import Founders from './components_main_manufacturers/Founders';

function MainManufacturers() {
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
        <Route path='/main/mean_energy_cost_per_car' component={MeanCostPerCar} />
        <Route path='/main/mean_energy_cost_statistics' component={MeanCostTotal} />
        <Route path='/main/energy_consumption_per_car_model' component={EnergyConsumption} />
        <Route path='/main/founders' component={Founders} />
      </Switch>
    </Router>
  );
}

export default MainManufacturers;
