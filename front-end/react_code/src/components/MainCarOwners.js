import React from 'react';
import Navbar from './components_main_car_owners/Navbar';
import './MainCarOwners.css';
import Home from './components_main_car_owners/pages/Home';
import { BrowserRouter as Router, Route,Switch, Redirect } from "react-router-dom";
import Services from './components_main_car_owners/pages/Services';
import Profile from './components_main_car_owners/pages/ProfileOwner';
import ContactUs from './components_main_car_owners/ContactUs';
import SignInPage from './SignInPage';
import Founders from './components_main_car_owners/Founders';
import Map from './components_main_car_owners/pages/Map';
import ChargeNow from './components_main_car_owners/pages/ChargeNow';
import ChargeInProgress from './components_main_car_owners/pages/ChargeInProgress';
import ChargeDone from './components_main_car_owners/pages/ChargeDone';
import ChargingStatistics from './components_main_car_owners/pages/ChargingStatistics';
import ChargingStatisticsKm from './components_main_car_owners/pages/ChargingStatisticsKm';
import ChargingStatisticsMoney from './components_main_car_owners/pages/ChargingStatisticsMoney';
import Payment from './components_main_car_owners/pages/Payment';
import PaymentNext from './components_main_car_owners/pages/PaymentNext';
import PaymentFinal from './components_main_car_owners/pages/PaymentFinal';
import SynchronousPayment from './components_main_car_owners/pages/SynchronousPayment';
import SynchronousPaymentFinal from './components_main_car_owners/pages/SynchronousPaymentFinal';


function MainCarOwners(props) {

  console.log(props)
  console.log(localStorage.category)

  function renderProtectedComponent(ProtectedComponent) {
      if (localStorage.category === "Car_Owner") {
        return  (props) => <ProtectedComponent {...props} />;
      }
      else {
        if (localStorage.category === "Energy_Supplier") {
            window.location.href = "https://localhost:3000/mainsup";
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
        <Route path='/mainown' exact render={renderProtectedComponent(Home)} />
        <Route path='/mainown/services' render={renderProtectedComponent(Services)} />
        <Route path='/mainown/profile' render={renderProtectedComponent(Profile)} />
        <Route path='/mainown/contact_us' render={renderProtectedComponent(ContactUs)} />
        <Route path='/sign_in' render={renderProtectedComponent(SignInPage)} />
        <Route path='/mainown/map' render={renderProtectedComponent(Map)} />
        <Route path='/mainown/charging' render={renderProtectedComponent(ChargeNow)} />
        <Route path='/mainown/founders' render={renderProtectedComponent(Founders)} />
        <Route path='/mainown/charging_in_progress' render={renderProtectedComponent(ChargeInProgress)} />
        <Route path='/mainown/charging_done' render={renderProtectedComponent(ChargeDone)} />
        <Route path='/mainown/charging_statistics' render={renderProtectedComponent(ChargingStatistics)} />
        <Route path='/mainown/payment' component={Payment} />
        <Route path='/mainown/payment_next' component={PaymentNext} />
        <Route path='/mainown/payment_final' component={PaymentFinal} />
        <Route path='/mainown/synchronous_payment' component={SynchronousPayment} />
        <Route path='/mainown/synchronous_payment_final' component={SynchronousPaymentFinal} />
        <Route path='/mainown/charging_statistics_km' component={ChargingStatisticsKm} />
        <Route path='/mainown/charging_statistics_price' component={ChargingStatisticsMoney} />
      </Switch>
    </Router>
  );
}

export default MainCarOwners;
