import ReactDOM from "react-dom";
import {useForm, Controller} from "react-hook-form";
import {PayStyle} from './Payment_components/SynchronousPaymentStyling'
import { useLocation , useHistory} from "react-router-dom";
import '../../MainCarOwners.css';
import React, { useEffect, useState } from 'react';
import ReactSelect from "react-select";
import { withRouter } from 'react-router-dom';
import {selectStyle2} from './Payment_components/SynchronousPaymentStyling'

function PaymentNext(props) {

const location = useLocation();

  const options = [
     { value: 'Paypal', label: 'Paypal' },
     { value: 'American Express', label: 'American Express' },
     { value: 'Visa', label: 'Visa' },
     { value: 'Discover Network', label: 'Discover Network' },
     { value: 'Master Card', label: 'Master Card' }
   ]

  const {
    register,
    handleSubmit,
    errors,
    setError,
    control,
    clearError,
    formState: { isSubmitting }
  } = useForm();

  const [owed, setOwed] = useState([])
  const [points, setPoints] = useState([])
  useEffect( () => {
  const tok = localStorage.getItem('token');
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


  return (
    <div className="synchronous_payment">
    <PayStyle>
    <div className="speech-bubble"><h1>You have {points.Points} points!</h1></div>


    <form className="App" onSubmit={handleSubmit(({payment,pointsGiven}) => {
     if (true){
        if (pointsGiven === "") pointsGiven=0
         console.log(payment.value,pointsGiven,location.state.money)
         if ((parseInt(pointsGiven)/0.2)>parseInt(location.state.money)) {
           alert("The points you gave are more than the money you owe!")
         }
         else {

           props.history.push({
           pathname: '/mainown/synchronous_payment_final',
           state: {  paymentWay : payment.value, price : location.state.money, pointsGiven : pointsGiven}
           })
           const tok = localStorage.getItem('token');
           fetch(`https://localhost:8765/evcharge/api/admin/UpdatePoints/${localStorage.username}/${location.state.money}/${pointsGiven}`, {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'x-access-token':tok
             }
           })
         }
     }
     }
    )}>


    <label className="label2">Please enter your credit card info </label>

    <label>Select payment way</label>
           <Controller
             as={<ReactSelect />}
             options={options}
             name="payment"
             isClearable
             defaultValue=""
             placeholder="Select payment way..."
             control={control}
             rules={{required : true}}
             onChange={([selected]) => {
               return { value: selected };
             }}
             styles={selectStyle2}
    />

    {errors.payment && <span className='error' >Please select a payment way! </span>}


      <label>Name on Card</label>
      <input type="text" id="cname" name="cardname" placeholder="John More Doe" ref={register({ required: true})}/>
      {errors.cardname && errors.cardname.type === "required" && <span className='error' >Field is required </span>}
      <label for="ccnum">Credit card number</label>
      <input type="text" id="ccnum" name="ccnum" placeholder="XXXX-XXXX-XXXX-XXXX" ref={register({ required: true, maxLength: 19, minLength:19})}/>
      {errors.ccnum && errors.ccnum.type === "required" && <span className='error' >Field is required </span>}
      {errors.ccnum && errors.ccnum.type === "maxLength" && <span className='error' >The correct form is XXXX-XXXX-XXXX-XXXX</span>}
      {errors.ccnum && errors.ccnum.type === "minLength" && <span className='error' >The correct form is XXXX-XXXX-XXXX-XXXX</span>}
      <label for="expmonth">Expiration Month</label>
      <input type="text" id="expmonth" name="expmonth" placeholder="September" ref={register({ required: true})}/>
      {errors.expmonth && errors.expmonth.type === "required" && <span className='error' >Field is required </span>}
      <label for="expyear" className="expYearLabel">Exp Year</label>
      <label for="cvv" className="CVVLabel">CVV</label>
      <input className="CVV" type="text" id="cvv" name="cvv" placeholder="352" ref={register({ required: true, maxLength: 3, minLength:3})}/>
      {errors.cvv && errors.cvv.type === "required" && <span className='error' >Field is required </span>}
      {errors.cvv && errors.cvv.type === "maxLength" && <span className='error' >Not valid CVV</span>}
      {errors.cvv && errors.cvv.type === "minLength" && <span className='error' >Not valid CVV</span>}
      <input className="expYear" type="text" id="expyear" name="expyear" placeholder="2018" ref={register({ required: true, maxLength: 4, minLength:4})}/>
      {errors.expyear && errors.expyear.type === "required" && <span className='error' >Field is required </span>}
      {errors.expyear && errors.expyear.type === "maxLength" && <span className='error' >Not valid year</span>}
      {errors.expyear && errors.expyear.type === "minLength" && <span className='error' >Not valid year</span>}
      <br/>
      <label className="label3">Would you like to use some points?(optional)</label>
      <input name="pointsGiven" type="number" placeholder="If not leave blank" onChange={e => setCalc(e.target.value/0.2)} ref={register({max: points.Points})}/>
      {errors.pointsGiven && errors.pointsGiven.type === "max" && <span className='error' >You can't spend more points than you own </span>}
      <p className="p2">= {calc} €</p>
      <button type="submit">Start payment</button>
      <br/>
      <br/>
    </form>


    </PayStyle>
    </div>
  );
}


export default PaymentNext
