import React from 'react';
import Navbar from './components_main_manufacturers/Navbar';
import './MainManufacturers.css';
import Home from './components_main_manufacturers/pages/Home';
import { BrowserRouter as Router, Route,Switch, Redirect } from "react-router-dom";
import Services from './components_main_manufacturers/pages/Services';
import Profile from './components_main_manufacturers/pages/ProfileManufacturer';
import ContactUs from './components_main_manufacturers/ContactUs';
import SignInPage from './SignInPage';
import ChargingSessions from './components_main_manufacturers/pages/ChargingSessionsPerManufacturer';
import MeanCostPerCar from './components_main_manufacturers/pages/MeanCostPerCar';
import MeanCostTotal from './components_main_manufacturers/pages/MeanCostTotal';
import EnergyConsumption from './components_main_manufacturers/pages/EnergyConsumption';
import MeanEnergyCost from './components_main_manufacturers/pages/MeanEnergyCost'
import Founders from './components_main_manufacturers/Founders';

function MainManufacturers(props) {

  function renderProtectedComponent(ProtectedComponent) {
      if (localStorage.category === "Car_Manufacturer") {
        return  (props) => <ProtectedComponent {...props} />;
      }
      else {
        if (localStorage.category === "Car_Owner") {
            window.location.href = "https://localhost:3000/mainown";
        }
        else if (localStorage.category === "Energy_Supplier") {
            window.location.href = "https://localhost:3000/mainsup";
        }
      }
    }




  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/mainman' exact render={renderProtectedComponent(Home)} />
        <Route path='/mainman/services' render={renderProtectedComponent(Services)} />
        <Route path='/mainman/profile' render={renderProtectedComponent(Profile)} />
        <Route path='/mainman/contact_us' render={renderProtectedComponent(ContactUs)} />
        <Route path='/sign_in' render={renderProtectedComponent(SignInPage)} />
        <Route path='/mainman/charging_sessions' render={renderProtectedComponent(ChargingSessions)} />
        <Route path='/mainman/mean_energy_cost_per_car' render={renderProtectedComponent(MeanCostPerCar)} />
        <Route path='/mainman/mean_energy_cost_statistics' render={renderProtectedComponent(MeanCostTotal)} />
        <Route path='/mainman/energy_consumption_report' render={renderProtectedComponent(EnergyConsumption)} />
        <Route path='/mainman/mean_energy_cost' render={renderProtectedComponent(MeanEnergyCost)} />
        <Route path='/mainman/founders' render={renderProtectedComponent(Founders)} />
      </Switch>
    </Router>
  );
}

export default MainManufacturers;
