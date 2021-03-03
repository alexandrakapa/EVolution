import ReactSelect from "react-select";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from 'react';

/*
export default function MeanCostPerCar() {
  const { handleSubmit, register, reset, control } = useForm({reValidateMode: 'onChange'});
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
 
  return(
    <section>
    <label>React Select</label>
    <Controller
      as={ReactSelect}
      options={options}
      name="ReactSelect"
      isClearable
      control={control}
    />
  </section>
  
  );
}
*/




function Form(props) {
 const { register, handleSubmit, errors , control} = useForm({reValidateMode: 'onChange'});

 const [startedOn, setStartedOn] = useState(false)
 const [finishedOn, setFinishedOn] = useState(false)

 const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

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
   <form onSubmit={handleSubmit(({region, startdate, enddate}) => {
        const newdate = startdate.split('-').join('')
        const newdate2 = enddate.split('-').join('')
        props.setStartDate( newdate)
        props.setEndDate( newdate2)
        props.setRegion(region)
        props.setDidSubmit(true)
        //console.log(newdate)
   })}>
     <h1>Select Date and Region</h1>
     <label>Postal Code</label>
     <input name="region" type="number" ref={register({ required: true, maxLength: 5,minLength: 2 }) } />
        {errors.region && errors.region.type === "required" && <span className='error' >Field is required </span>}
        {errors.region && errors.region.type === "maxLength" && <span className='error'>Maximum length 5 digits</span> }
        {errors.region && errors.region.type === "minLength" && <span className='error'>Minumum length 2 digits</span> }
       
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
        <label>React Select</label>
    <Controller
      rules={{ required: true }} 
      as={ReactSelect}
      options={options}
      name="ReactSelect"
      isClearable
      control={control}
    />
     {errors.ReactSelect && <span className='error' >Field is required </span>}
     <button className='Button'>Submit</button>
   </form>
 );
}

export default Form