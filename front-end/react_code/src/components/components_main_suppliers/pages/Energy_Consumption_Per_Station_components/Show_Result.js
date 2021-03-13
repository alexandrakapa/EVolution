import React, { useState } from "react";
import { useTrail, animated as a } from "react-spring";
import "./Show_Result2.css";

function ShowResult(props) {
const check=props.check;
const name= props.name;
const start_date=props.start_date;
const end_date=props.end_date;
const station_name= props.station_name;
const station_id= props.station_id;
const result=props.result;
console.log(check);
if(check===0){
  return ( <div className='form23'>
<h1 className='h12'> Your results </h1>
<label className='label2'> Company name: {name.SupplierName} </label>
<label className='label2'> From: {start_date.PeriodFrom} </label>
<label className='label2'> To: {end_date.PeriodTo}</label>
<label className='label2'> Station Id: {station_id.StationID} </label>
<label className='label2'> Station Name: {station_name.Station} </label>
<label className='label12'> Total Energy Consumption: {result.TotalEnergyDelivered} kWh </label>
   </div>);

}
else {
  return ( <div className='form23'>
<p className='h12_new'> No data available  </p>

   </div>);
}
}


export default ShowResult;
