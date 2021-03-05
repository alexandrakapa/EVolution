import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';



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


 return (
   <form onSubmit={handleSubmit(({region, startdate, enddate}) => {
        const newdate = startdate.split('-').join('')
        const newdate2 = enddate.split('-').join('')
        props.setStartDate( newdate)
        props.setEndDate( newdate2)
        props.setDidSubmit(true)
        console.log(newdate, newdate2)
   })}>
     <h1>Select date</h1>
       
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
     <button className='Button'>Show results</button>
   </form>
 );
}

export default Form