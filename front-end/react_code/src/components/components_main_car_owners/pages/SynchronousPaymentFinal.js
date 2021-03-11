import ReactDOM from "react-dom";
import {useForm} from "react-hook-form";
import {PayStyle} from './Payment_components/PaymentFinalStyling'
import '../../MainCarOwners.css';
import React, { useEffect, useState } from 'react';
import { useLocation , useHistory} from "react-router-dom";
import { FaCheckCircle,FaCheck} from "react-icons/fa";
import  { AiFillCheckCircle } from "react-icons/ai";

function App(props) {

const location = useLocation();
useEffect(()=>{
  if (location.state==undefined){
    props.history.push('/main/synchronous_payment')
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
  var total = earned + points.Points - location.state.pointsGiven

  return (
    <PayStyle className="synchronous_payment_final">
<div>
<AiFillCheckCircle className="icon" color="#f1f1f1" size="4em"/>
</div>
    <label>Your payment was successful!  </label>
<div className="speech-bubble"><h1>You have earned {earned} point(s)!</h1></div>
  <div className="speech-bubble_2"><h1>Your total number of points is {total} points!</h1></div>
    </PayStyle>

  );
}


export default App
