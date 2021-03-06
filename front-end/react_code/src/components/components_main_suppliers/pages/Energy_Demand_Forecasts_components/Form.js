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
        props.setEndDate( enddate)
        props.setDidSubmit(true)
        //console.log(newdate)
   })}>
    <h1_new> Energy Consumption Per Station </h1_new>
     <h1>Select Date</h1>
     <label>From</label>
     <input onChange={handleStartChange} name="startdate" type="number" ref={register({ required: true, validate: value => {
        if (finishedOn){
           return(value<=finishedOn)
        }
        else{
           return true
        }
     }})} />
        {errors.startdate && errors.startdate.type === "required" && <span className='error' >Field is required </span>}
        {errors.startdate && errors.startdate.type === "validate" && <span className='error' >Start Year can't be bigger than end date </span>}
    <label>To</label>
     <input onChange={handleEndChange} name="enddate" type="number" ref={register({ required: true, validate: value => {
        if (startedOn){
           return(value>=startedOn)
        }
        else{
           return true
        }
     }})} />
        {errors.enddate && errors.enddate.type === "required" && <span className='error' >Field is required </span>}
        {errors.enddate && errors.enddate.type === "validate" && <span className='error' >End Year can't be smaller than start date </span>}
      <label_new> Results concern period 2018-2020 </label_new>
     <button className='Button'>Show Results</button>
   </form>
 );
}

export default Form
