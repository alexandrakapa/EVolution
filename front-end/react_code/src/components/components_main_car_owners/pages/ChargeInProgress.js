/*import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ChargeInProgress(props){
	const location = useLocation();

	useEffect(()=>{
		if (location.state==undefined){
			props.history.push('/main/charging')
		}
	},[location])


	if (location.state!==undefined){
		return(

			<div>
				<h1>Hello</h1>
				
				<button onClick={()=>{       console.log(location.state)}}>Press</button>
			</div>
		)
	}
	else return(
			<h1>Redirecting...</h1>
		)
}

export default ChargeInProgress

*/



/*
onComplete={(totalElapsedTime) => [
		          remainingTime - totalElapsedTime > 0
		        ]}
		        */


import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./ChargingTimerStyle.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import VideoCharge from './videos/video_charge.mp4'
import Message from './ChargeInProgress_components/Message'

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

function ChargeInProgress(props){
	const location = useLocation();

	useEffect(()=>{
		if (location.state==undefined){
			props.history.push('/main/charging')
		}
	},[location])

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 3974; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  
  if (location.state!==undefined){
		return(
			<div className='chargeInProgress'>
				<video
					autoPlay
					loop
					muted
					style={{
						position : "absolute",
						width : "100%",
						left : "49.96%",
						top : "49.96%",
						height : "100%",
						objectFit : "cover",
						transform : "translate(-50%, -50%)",
						zIndex : "-10"
					}}
				>
					<source src={VideoCharge} type="video/mp4" />
				</video>

				<Message/>

			    <div className='timer'>
			      
			      <CountdownCircleTimer
			        {...timerProps}
			        colors={[["#218380"]]}
			        duration={daySeconds}
			        initialRemainingTime={remainingTime % daySeconds}
			        onComplete={(totalElapsedTime) => [
			          remainingTime - totalElapsedTime > hourSeconds
			        ]}
			      >
			        {({ elapsedTime }) =>
			          renderTime("hours", getTimeHours(daySeconds - elapsedTime))
			        }
			      </CountdownCircleTimer>
			      <CountdownCircleTimer
			        {...timerProps}
			        colors={[["#218380"]]}
			        duration={hourSeconds}
			        initialRemainingTime={remainingTime % hourSeconds}
			        onComplete={(totalElapsedTime) => [
			          remainingTime - totalElapsedTime > minuteSeconds
			        ]}
			      >
			        {({ elapsedTime }) =>
			          renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
			        }
			      </CountdownCircleTimer>
			      <CountdownCircleTimer
			        {...timerProps}
			        colors={[["#218380"]]}
			        duration={minuteSeconds}
			        initialRemainingTime={remainingTime % minuteSeconds}
			        onComplete={()=>{
			        	 // alert("done!")
			        	  //console.log(car.ID, money, payment.value, selectedStationID, selectedPoint)
				          props.history.push({
				          pathname: '/main/charging_done',
				          state: { carID : location.state.carID, money : location.state.money, paymentWay : location.state.paymentWay, stationID : location.state.stationID, pointName : location.state.pointName }
				          })
			        }}
			      >
			        {({ elapsedTime }) =>
			          renderTime("seconds", getTimeSeconds(elapsedTime))
			        }
			      </CountdownCircleTimer>
			    </div>
		    </div>
		  )
	}
	else return(
			<h1>Redirecting...</h1>
		)
}

export default ChargeInProgress
