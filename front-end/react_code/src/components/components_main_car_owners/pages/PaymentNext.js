import ReactDOM from "react-dom";
import {useForm, Controller} from "react-hook-form";
import {PayStyle} from './Payment_components/PaymentStylingNext'
import { useLocation , useHistory} from "react-router-dom";
import '../../MainCarOwners.css';
import React, { useEffect, useState } from 'react';
import ReactSelect from "react-select";
import { withRouter } from 'react-router-dom';
import {selectStyle2} from './Payment_components/PaymentStylingNext'

function PaymentNext(props) {

const location = useLocation();
useEffect(()=>{
  if (location.state==undefined){
    props.history.push('/mainown/payment')
  }
},[location])

  const options = [
     { value: 'Paypal', label: 'Paypal' },
     { value: 'American Express', label: 'American Express' },
     { value: 'Visa', label: 'Visa' },
     { value: 'Discover Network', label: 'Discover Network' },
     { value: 'Master Card', label: 'Master Card' }
   ]

  const [points, setPoints] = useState([])

  const {
    register,
    handleSubmit,
    errors,
    setError,
    control,
    clearError,
    formState: { isSubmitting }
  } = useForm();

  var rand = Math.floor(Math.random() * (4 - 1 + 1) + 1);
  console.log(rand)

  return (
    <div className="payment_next">
    <PayStyle >
    <form className="App" onSubmit={handleSubmit(({payment}) => {
     if (true){
         console.log(payment.value,location.state.price,location.state.pointsGiven)
           props.history.push({
           pathname: '/mainown/payment_final',
           state: {  paymentWay : payment.value, price : location.state.price, pointsGiven: location.state.pointsGiven}
           })
           const tok = localStorage.getItem('token');
           fetch(`https://localhost:8765/evcharge/api/CreatePayment/${localStorage.username}/${location.state.price}/${payment.value}/${rand}/${location.state.pointsGiven}`, {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-type':'application/json',
               'x-access-token':tok
             }
           })
     }
     }
    )}>



    <label className="label2">Please enter your credit card info </label>

    <label>Select payment way </label>
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
      {errors.cardname && errors.cardname.type === "required" && <span className='error_name' >Field is required </span>}
      <label type="text" >Credit card number</label>
      <input type="text" name="ccnum" placeholder="XXXX-XXXX-XXXX-XXXX" ref={register({ required: true, maxLength: 19, minLength:19})}/>
      {errors.ccnum && errors.ccnum.type === "required" && <span className='error_name' >Field is required </span>}
      {errors.ccnum && errors.ccnum.type === "maxLength" && <span className='error' >The correct form is XXXX-XXXX-XXXX-XXXX</span>}
      {errors.ccnum && errors.ccnum.type === "minLength" && <span className='error' >The correct form is XXXX-XXXX-XXXX-XXXX</span>}
      <label for="expmonth">Expiration Month</label>
      <input type="text" name="expmonth" placeholder="September" ref={register({ required: true})}/>
      {errors.expmonth && errors.expmonth.type === "required" && <span className='error_exp_month' >Field is required </span>}
      <div>
      <label for="expyear" className="expYearLabel">Exp Year</label>
      <label for="cvv" className="CVVLabel">CVV</label>
      <input className="CVV" type="number" id="cvv" name="cvv" placeholder="352"  ref={register({ required: true, maxLength: 3, minLength:3})}/>
      {errors.cvv && errors.cvv.type === "required" && <span className='error_cvv' >Field is required </span>}
      {errors.cvv && errors.cvv.type === "maxLength" && <span className='error_cvv' >Not valid CVV</span>}
      {errors.cvv && errors.cvv.type === "minLength" && <span className='error_cvv' >Not valid CVV</span>}
      <input className="expYear" type="number" id="expyear" name="expyear" placeholder="2018" ref={register({ required: true, maxLength: 4, minLength:4})}/>
      {errors.expyear && errors.expyear.type === "required" && <span className='error_expyear' >Field is required </span>}
      {errors.expyear && errors.expyear.type === "maxLength" && <span className='error_expyear' >Not valid year</span>}
      {errors.expyear && errors.expyear.type === "minLength" && <span className='error_expyear' >Not valid year</span>}
      </div>
      <button type="submit">Start payment</button>
      <br/>
      <br/>
    </form>
    </PayStyle>
    </div>
  );
}


export default PaymentNext
