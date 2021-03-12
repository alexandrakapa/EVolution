import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import FromStyle from './FormStyling'
import {selectStyle1} from './FormStyling.js'
import AsyncSelect from "react-select/async"
import '../../../MainSuppliers.css'


function Form(props) {
  const { register, handleSubmit, errors , control} = useForm({reValidateMode: 'onChange'});

 const [startedOn, setStartedOn] = useState(false)
 const [finishedOn, setFinishedOn] = useState(false)
 const [selectedStationID, setSelectedStationID] = useState(false)

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

function handleStationChange(value){
 // const {name,value}=event.target;
 setSelectedStationID(value.StationID)
 console.log(selectedStationID)
  return value

}

function checkBig(){
   console.log("hi")
}

const getOptions = (inputValue) =>
{
  const tok = localStorage.getItem('token');
 return fetch(`https://localhost:8765/evcharge/api/StationAddressesPerSupplier/${localStorage.id}`,{headers:{'Content-type':'application/json','x-access-token':tok}})
 .then(response => response.json())
         //.catch(err => console.log(err))
}

 return (
   <form onSubmit={handleSubmit(({station, startdate, enddate}) => {
        const newdate = startdate.split('-').join('')
        const newdate2 = enddate.split('-').join('')
        props.setStartDate( newdate)
        props.setEndDate( newdate2)
        props.setStation(selectedStationID)
        props.setDidSubmit(true)
        console.log(selectedStationID)
   })}>
    <h1_new> Energy Consumption Per Station </h1_new>
     <h1>Select Date and Station</h1>
     <label>Station</label>

     <AsyncSelect
      noOptionsMessage={() => 'No charging stations.'}
      loadingMessage={() => 'Searching for charging stations...'}
      placeholder="Select charging station..."
      cacheOptions
      defaultOptions
      getOptionLabel={e => e.Address}
      getOptionValue={e => e.Address}
      loadOptions={getOptions}
      styles={selectStyle1}
      name="stations"
      isClearable={false}
      isSearchable={false}
      control={control}
      defaultValue={false}
      onChange={
             handleStationChange

           }
      />

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
