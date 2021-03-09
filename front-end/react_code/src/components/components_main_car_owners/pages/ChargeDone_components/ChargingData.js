import "./ChargingData.css";
import React, { useState } from "react";
import { useTrail, animated as a } from "react-spring";


function ChargingData(props) {


	const ID=props.data.ID;
	const energy= props.data.kWh_delivered;
	const protocol=props.data.protocol;
	const batteryBegin=props.data.battery_percent_begin;
	const batteryEnd= props.data.battery_percent_end;
	const price=props.data.charging_price<=props.money? props.data.charging_price : props.money;
	const timeNow=new Date().getTime()/1000

	var currentdate = new Date(); 
	var tmp=currentdate.getTime() - 3974*1000
	var chargedate= new Date(null);
	chargedate.setTime(tmp);

	var paymentWay=props.paymentWay=='card_in_app' ? 
									  "With card in app"
									  : props.paymentWay=='station'	?
									  "At station"
									  : "Later in app"

	var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " : "  
                + currentdate.getHours() + ":"  
               
     
    var mins= currentdate.getMinutes()<10? "0"+currentdate.getMinutes() : currentdate.getMinutes();          
    var secs= currentdate.getSeconds()<10? "0"+currentdate.getSeconds() : currentdate.getSeconds();
    var datetime=datetime+mins+":"+secs


    var connectiontime=chargedate.getDate() + "/"
    				+ (chargedate.getMonth()+1)  + "/" 
                	+ chargedate.getFullYear() + " : "  
                	+ chargedate.getHours() + ":"
    var mins_1= chargedate.getMinutes()<10? "0"+chargedate.getMinutes() : chargedate.getMinutes();          
    var secs_1= chargedate.getSeconds()<10? "0"+chargedate.getSeconds() : chargedate.getSeconds();
    var connectiontime=connectiontime+mins_1+":"+secs_1


	if(props.check===0){
		 return ( 
			<div className='charging_results'>
				<h1 className='title_res'> Some information about your charging: </h1>

				<label className='label_res'> Connection time: {connectiontime} </label>
				<label className='label_res'> Done charging time: {datetime} </label>
				<label className='label_res'> Charging duration: {new Date(3974 * 1000).toISOString().substr(11, 8)} </label>

				<hr style={{marginTop: '15px', marginBottom: '5px', border : '1px dashed rgba(44, 130, 201, 0.6)'}}/>

				<label className='label_res'> Energy delivered: {energy} kWh </label>
				<label className='label_res'> Charging protocol: {protocol} </label>
				<label className='label_res'> Battery before charging: {batteryBegin} %</label>
				<label className='label_res'> Battery before after charging: {batteryEnd} %</label>

				<hr style={{marginTop: '15px', marginBottom: '5px', border : '1px dashed rgba(44, 130, 201, 0.6)'}}/>


				<label className='label_res'> Charging price: {price} euros </label>
				<label className='label_res'> Payment way: {paymentWay}</label>
				
				</div>);

	}


	else {
		  return ( <div className='charging_results'>
		<p className='no_data'> No data available  </p>

		   </div>);
	}
}


export default ChargingData;


