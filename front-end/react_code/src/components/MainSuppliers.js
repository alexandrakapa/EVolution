import React from 'react';
import Navbar from './components_main_suppliers/Navbar';
import './MainSuppliers.css';
import Home from './components_main_suppliers/pages/Home';
import { BrowserRouter as Router, Route,Switch, Redirect } from "react-router-dom";
import Services from './components_main_suppliers/pages/Services';
import Profile from './components_main_suppliers/pages/ProfileSupplier';
import ContactUs from './components_main_suppliers/ContactUs';
import SignInPage from './SignInPage';
import EnergyDemand from './components_main_suppliers/pages/Energy_Demand_Forecasts';
import EnergyConsPerDistrict from './components_main_suppliers/pages/Energy_Consumption_Per_District';
import EnergyConsPerStation from './components_main_suppliers/pages/Energy_Consumption_Per_Station';
import EnergyCons from './components_main_suppliers/pages/Energy_Consumption';
import Founders from './components_main_suppliers/Founders';





function MainSuppliers(props) {


function renderProtectedComponent(ProtectedComponent) {
    if (localStorage.category === "Energy_Supplier") {
      return  (props) => <ProtectedComponent {...props} />;
    }
    else {
      if (localStorage.category === "Car_Owner") {
          window.location.href = "https://localhost:3000/mainown";
      }
      else if (localStorage.category === "Car_Manufacturer") {
          window.location.href = "https://localhost:3000/mainman";
      }
    }
  }



  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/mainsup' exact render={renderProtectedComponent(Home)} />
        <Route path='/mainsup/services' render={renderProtectedComponent(Services)} />
        <Route path='/mainsup/profile' render={renderProtectedComponent(Profile)} />
        <Route path='/mainsup/contact_us' render={renderProtectedComponent(ContactUs)} />
        <Route path='/sign_in' render={renderProtectedComponent(SignInPage)} />
        <Route path='/mainsup/energy_demand_forecasts' render={renderProtectedComponent(EnergyDemand)} />
        <Route path='/mainsup/energy_consumption_per_district' render={renderProtectedComponent(EnergyConsPerDistrict)} />
        <Route path='/mainsup/energy_consumption_per_station' render={renderProtectedComponent(EnergyConsPerStation)} />
        <Route path='/mainsup/energy_consumption' render={renderProtectedComponent(EnergyCons)} />
        <Route path='/mainsup/founders' render={renderProtectedComponent(Founders)} />
      </Switch>
    </Router>
  );
}

export default MainSuppliers;
