import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import FromStyle from './FormStyling'
import '../../../MainSuppliers.css'


function Form(props) {

 const { register, handleSubmit, errors } = useForm({reValidateMode: 'onChange'});

 const [startedOn, setStartedOn] = useState(false)
 const [finishedOn, setFinishedOn] = useState(false)

 function handleStartChange(event){
    const {name, value}=event.target
    setStartedOn(value)
    console.log(value)

 }
 function handleEndChange(event){
   const {name, value}=event.target
   setFinishedOn(value)
   console.log(value)

}

function checkBig(){
   console.log("hi")
}


 return (
   <form onSubmit={handleSubmit(({ startdate, enddate}) => {
        props.setStartDate( startdate)
        props.setDidSubmit(true)
        //console.log(newdate)
   })}>
    <h1_new_charging> Km Charging Statistics  </h1_new_charging>
     <h1>Select Year</h1>
     <label>Year</label>
     <input onChange={handleStartChange} name="startdate" type="number" ref={register({ required: true, validate: true })} />
        {errors.startdate && errors.startdate.type === "required" && <span className='error' >Field is required </span>}
      <label_new> *Results concern period 2018-2020* </label_new>
     <button className='Button'>Show Results</button>
   </form>
 );
}

export default Form
