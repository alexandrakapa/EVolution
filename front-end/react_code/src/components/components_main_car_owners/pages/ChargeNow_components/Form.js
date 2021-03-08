import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import ReactSelect from "react-select";
import {selectStyle1} from './FormStyling.js'
import AsyncSelect from "react-select/async"
import {selectStyle2} from './FormStyling.js'


function Form(props) {
 const { register, handleSubmit, errors , control} = useForm({reValidateMode: 'onChange'});

 const [startedOn, setStartedOn] = useState(false)
 const [finishedOn, setFinishedOn] = useState(false)

 const [selectedStationID, setSelectedStationID] = useState(false)
 const [selectedPoint, setSelectedPoint] = useState(false)


 const options = [
    { value: 'card', label: 'Card' },
    { value: 'cash', label: 'Cash' },
    { value: 'later_in_app', label: 'Pay later in app' }
  ]

  function handleStationChange(value){
   // const {name,value}=event.target;
   setSelectedStationID(value.StationID)
   setSelectedPoint(false)
   console.log(selectedStationID)
   //refs.pos.loadOptions('')
    return value

  }

  function handlePointChange(value){
    setSelectedPoint(value.Name)
  }

  const getOptions = (inputValue) =>
{
   return fetch(`http://localhost:8765/evcharge/api/StationAddresses`)
   .then(response => response.json())
           //.catch(err => console.log(err))
      
}

  const getOptions2 = (inputValue) =>
{   
  if (selectedStationID){
   return fetch(`http://localhost:8765/evcharge/api/StationPoints/${selectedStationID}`)
   .then(response => response.json())
   .then(data=>{
    var i
    var tmp=[]
    for (i=0; i<data.length; i++){
      if (data[i].Active && !data[i].Taken){
        tmp.push(data[i])
      }
    }
    return(tmp)
   })
   }        //.catch(err => console.log(err))
      
}


 return (
   <form onSubmit={handleSubmit(({money,payment}) => {
    if (selectedStationID && selectedPoint)
        console.log(money, payment.value, selectedStationID, selectedPoint)
    else if (selectedStationID && !selectedPoint)
        alert("Please select a charging position to continue!")  
    else
      alert("Please select a charging station and position to continue!")
       // props.setDidSubmit(true)
       // console.log(newdate, newdate2)
   })}>
     <h1Top1>Give us some details</h1Top1>
     <h1>Please fill in the following:</h1>
       

       <label>Select a charging station</label>

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

     {errors.stations && <span className='error' >Please select a charging station! </span>}

      <label>Select a charging postition</label>

        
         <AsyncSelect
           noOptionsMessage={() => 'No available charging points.'}
           loadingMessage={() => 'Select a charging station to see charging points.'}
           placeholder="Select charging point..."
           key={selectedStationID}
           cacheOptions
           defaultOptions
           getOptionLabel={e => e.Name}
           getOptionValue={e => e.Name}
           loadOptions={getOptions2}
           styles={selectStyle1}
           name="positions"
           isClearable={false}
           isSearchable={false}
           control={control}
           defaultValue={false}
           onChange={
            handlePointChange
           }
          
      
    />
     {errors.positions && <span className='error' >Please select a charging station! </span>}

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
      //defaultValue={['','']}
    />

    {errors.payment && <span className='error' >Please select a payment way! </span>}

     <label>Select value of money to charge (optional).</label>
     <input  name="money" type="number" ref={register({ maxLength: 3 , min : 0}) } />
        {errors.money && errors.money.type === "maxLength" && <span className='error'>Maximum length 5 digits</span> }
        {errors.money && errors.money.type === "min" && <span className='error'>The value cannot be negative!</span> }

     <button className='Button'>Start charging!</button>




   </form>
 );
}

export default Form