import ReactSelect from "react-select";
import AsyncSelect from "react-select/async"
import { useForm, Controller } from "react-hook-form";
import React, { useCallback, useEffect, useState } from 'react';
import {selectStyle} from './FormStyling.js'


function Form(props) {
 const { register, handleSubmit, errors , control} = useForm({reValidateMode: 'onChange'});

 const [startedOn, setStartedOn] = useState(false)
 const [finishedOn, setFinishedOn] = useState(false)

 const [manufacturerModels, setManufacturerModels] = useState([])
 const [selectOptions, setSelectOptions] = useState([])

 /*const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]*/

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
/*
useEffect(() => {
   fetch(`http://localhost:8765/evcharge/api/EnergyCost/GetModels/23`)
   .then(response => response.json())
         .then(fetchedData => {
             setManufacturerModels(()=>fetchedData)

             
         })
         .then(()=>{
           var i
           let tmp=[]
           for (i=0; i<manufacturerModels.length; i++){
             console.log(manufacturerModels[i].Model)
             tmp.push( {value: manufacturerModels[i].Model, label: manufacturerModels[i].Model})
           }

           setSelectOptions(tmp)

         })
         .catch(err => console.log(err))
      

       
 }, [])
*/
const getOptions = (inputValue) =>
{
   return fetch(`http://localhost:8765/evcharge/api/EnergyCost/GetModels/23`)
   .then(response => response.json())
           //.catch(err => console.log(err))
      
}

 return (
   <form onSubmit={handleSubmit(({startdate, enddate, model}) => {
        const newdate = startdate.split('-').join('')
        const newdate2 = enddate.split('-').join('')
        props.setStartDate( newdate)
        props.setEndDate( newdate2)
        props.setModel(model.Model)
        props.setDidSubmit(true) 
        console.log(newdate, newdate2, model.Model)
   })}>
      <h1Top>Mean energy cost per km for your cars</h1Top>
     <h1>Select date and car model</h1>
            
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
        
    <label>Car model</label>

     <Controller
     as={AsyncSelect}
    
       cacheOptions
       defaultOptions
       getOptionLabel={e => e.Model}
       getOptionValue={e => e.Model}
       loadOptions={getOptions}
       styles={selectStyle}
       name="model"
       isClearable
       isSearchable={false}
       control={control}
       rules={{ required: true }}
    
    />
     {errors.model && <span className='error' >Field is required </span>}
     <button className='Button'>Show results</button>
   </form>
 );
}

export default Form


/*
    <Controller
      rules={{ required: true }} 
      as={AsyncSelect}
      //cacheOptions
      //options={selectOptions}
      loadOptions={getOptions}
      name="model"
      isClearable
      control={control}
      styles={selectStyle}
      //defaultValue={['','']}
    />
    */