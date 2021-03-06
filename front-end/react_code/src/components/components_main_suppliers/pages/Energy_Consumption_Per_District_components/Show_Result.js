import React, { useState } from "react";
import { useTrail, animated as a } from "react-spring";
import "./Show_Result1.css";

function ShowResult(props) {
const check=props.check;
const name= props.name;
const start_date=props.start_date;
const end_date=props.end_date;
const region= props.region;
const result=props.result;
console.log(check);
if(check===0){
  return ( <div className='form1'>
<h1 className='h11'> Your results </h1>
<label className='label1c'> Company name: {name.SupplierName} </label>
<label className='label1c'> From: {start_date.PeriodFrom} </label>
<label className='label1c'> To: {end_date.PeriodTo}</label>
<label className='label1c'> Region: {region.Region} </label>
<label className='label11'> Total Energy Consumption: {result.TotalEnergyDelivered} kWh </label>
   </div>);

}
else {
  return ( <div className='form1'>
<p className='h11_new'> No data available  </p>

   </div>);
}
}


export default ShowResult;
