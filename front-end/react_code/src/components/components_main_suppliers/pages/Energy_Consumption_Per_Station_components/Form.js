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
   <form onSubmit={handleSubmit(({station, startdate, enddate}) => {
        const newdate = startdate.split('-').join('')
        const newdate2 = enddate.split('-').join('')
        props.setStartDate( newdate)
        props.setEndDate( newdate2)
        props.setStation(station)
        props.setDidSubmit(true)
        //console.log(newdate)
   })}>
    <h1_new> Energy Consumption Per Station </h1_new>
     <h1>Select Date and Station</h1>
     <label>Station</label>
     <input name="station" type="text" ref={register({ required: true, maxLength: 12,minLength: 11 }) } />
        {errors.station && errors.station.type === "required" && <span className='error' >Field is required </span>}
        {errors.station && errors.station.type === "maxLength" && <span className='error'>Maximum length 12 </span> }
        {errors.station && errors.station.type === "minLength" && <span className='error'>Minumum length 11</span> }

     <label>From</label>
     <input onChange={handleStartChange} name="startdate" type="date" ref={register({ required: true, validate: value => {
        if (finishedOn){
           return(value<=finishedOn)
        }
        else{
           return true
        }
     }})} />
        {errors.startdate && errors.startdate.type === "required" && <span className='error' >Field is required </span>}
        {errors.startdate && errors.startdate.type === "validate" && <span className='error' >Start date can't be bigger than end date </span>}
    <label>To</label>
     <input onChange={handleEndChange} name="enddate" type="date" ref={register({ required: true, validate: value => {
        if (startedOn){
           return(value>=startedOn)
        }
        else{
           return true
        }
     }})} />
        {errors.enddate && errors.enddate.type === "required" && <span className='error' >Field is required </span>}
        {errors.enddate && errors.enddate.type === "validate" && <span className='error' >End date can't be smaller than start date </span>}
     <button className='Button'>Show Results</button>
   </form>
 );
}

export default Form
