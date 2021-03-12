import ReactDOM from "react-dom";
import {useForm} from "react-hook-form";
import {PayStyle} from './Payment_components/PaymentStyling'
import '../../MainCarOwners.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { useLocation , useHistory} from "react-router-dom";

function App(props) {



  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting }
  } = useForm();



  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const validateUserName = async value => {
    await sleep(1000);
    if (value !== "bill") {
      setError("username", "validate");
    } else {
      clearError("username");
    }
  };

  const [owed, setOwed] = useState([])
  const [points, setPoints] = useState([])
  useEffect( () => {
    const tok = localStorage.getItem('token');
    console.log(localStorage.username);
  fetch(`https://localhost:8765/evcharge/api/PaymentPage/${localStorage.username}`,{headers:{'Content-type':'application/json','x-access-token':tok}})
    .then(response => response.json())
           .then(fetchedData => {

               setOwed(() => fetchedData[0])
               setPoints(() => fetchedData[1])
                  console.log(fetchedData[0])
                  console.log(fetchedData[1])


              })

  },[])

const [calc, setCalc] = useState('');
var x=owed.OwedMoney;


  return (
    <div className="payment">
    <PayStyle >
    <div className="speech-bubble_2"><h1>You owe {owed.OwedMoney} €!</h1></div>
    <div className="speech-bubble"><h1>You have {points.Points} points!</h1></div>


    <form className="App" onSubmit={handleSubmit(({price,pointsGiven}) => {
     if (true){
         console.log(price,pointsGiven)
  if ((parseInt(pointsGiven)/0.2)>parseInt(owed.OwedMoney)) {
    alert("The points you gave are more than the money you owe!")
  }
  else {
  if (pointsGiven === "") pointsGiven=0
  console.log(price,pointsGiven)
           props.history.push({
           pathname: '/mainown/payment_next',
           state: {price: price, pointsGiven: pointsGiven}
           })
         }
     }
     }
    )}>

      <label>Please enter the price you want to pay: </label>
      <input name="price" type="number" step=".01" placeholder="Price in €" ref={register({ required: true, max: owed.OwedMoney})} />
      {errors.price && errors.price.type === "required" && <span className='error' >Field is required </span>}
      {errors.price && errors.price.type === "max" && <span className='error' >You can't pay more than you own </span>}

      <label>Do you want to use any of your points? (optional)</label>

      <input name="pointsGiven" type="number" placeholder="If not leave blank" onChange={e => setCalc(e.target.value/0.2)} ref={register({max: points.Points})} />
      {errors.pointsGiven && errors.pointsGiven.type === "max" && <span className='error' >You can't spend more points than you own </span>}
      <p className="p2">= {calc} €</p>
      <br/>
      <br/>
      <button type="submit">NEXT</button>
    </form>


    </PayStyle>
    </div>

  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default withRouter(App)
