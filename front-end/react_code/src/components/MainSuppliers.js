import React from 'react';
import Navbar from './components_main_suppliers/Navbar';
import './MainManufacturers.css';
import Home from './components_main_suppliers/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components_main_suppliers/pages/Services';
import Profile from './components_main_suppliers/pages/Profile';
import ContactUs from './components_main_suppliers/pages/ContactUs';
import SignInPage from './SignInPage';
import EnergyDemand from './components_main_suppliers/pages/Energy_Demand_Forecasts';
import EnergyConsPerDistrict from './components_main_suppliers/pages/Energy_Consumption_Per_District';
import EnergyConsPerStation from './components_main_suppliers/pages/Energy_Consumption_Per_Station';
import EnergyCons from './components_main_suppliers/pages/Energy_Consumption';
import Founders from './components_main_suppliers/pages/Founders';

function MainSuppliers() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/main' exact component={Home} />
        <Route path='/main/services' component={Services} />
        <Route path='/main/profile' component={Profile} />
        <Route path='/main/contact_us' component={ContactUs} />
        <Route path='/sign_in' component={SignInPage} />
        <Route path='/main/energy_demand_forecasts' component={EnergyDemand} />
        <Route path='/main/energy_consumption_per_district' component={EnergyConsPerDistrict} />
        <Route path='/main/energy_consumption_per_station' component={EnergyConsPerStation} />
        <Route path='/main/energy_consumption' component={EnergyCons} />
        <Route path='/main/founders' component={Founders} />
      </Switch>
    </Router>
  );
}

export default MainSuppliers;
