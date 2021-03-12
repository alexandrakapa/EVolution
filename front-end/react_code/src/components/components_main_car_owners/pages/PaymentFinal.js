import ReactDOM from "react-dom";
import {useForm} from "react-hook-form";
import {PayStyleFinal} from './Payment_components/PaymentFinalStyling'
import '../../MainCarOwners.css';
import React, { useEffect, useState } from 'react';
import { useLocation , useHistory} from "react-router-dom";
import { FaCheckCircle,FaCheck} from "react-icons/fa";
import  { AiFillCheckCircle } from "react-icons/ai";

function App(props) {

const location = useLocation();
useEffect(()=>{
  if (location.state==undefined){
    props.history.push('/main/payment')
  }
},[location])

  const [owed, setOwed] = useState([])
  const [points, setPoints] = useState([])
  useEffect( () => {
    const tok = localStorage.getItem('token');
  fetch(`http://localhost:8765/evcharge/api/PaymentPage/${localStorage.username}`,{headers:{'Content-type':'application/json','x-access-token':tok}})
    .then(response => response.json())
           .then(fetchedData => {

               setOwed(() => fetchedData[0])
               setPoints(() => fetchedData[1])
                  console.log(fetchedData[0])
                  console.log(fetchedData[1])


              })

  },[])

  var earned = Math.round(location.state.price * 0.2);
  var minpoints = location.state.pointsGiven/0.2;
  var money = owed.OwedMoney - location.state.price - minpoints
  var total = earned + points.Points - location.state.pointsGiven

  return (
    <PayStyleFinal className="payment_final">
<div>
<AiFillCheckCircle className="icon" color="#f1f1f1" size="4em"/>
</div>
    <label>Your payment was successful!  </label>
<div className="speech-bubble_1"><h1>You have earned {earned} point(s)!</h1></div>
  <div className="speech-bubble_2"><h1>Your total number of points is {total} points!</h1></div>
  <div className="speech-bubble_1"><h1>You owe {money} € now!</h1></div>
    </PayStyleFinal>

  );
}


export default App
