import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoCharge from './videos/video_charge.mp4';
import Message from './ChargeDone_components/Message'
import {BatteryLoading} from 'react-loadingg'
import ChargingData from './ChargeDone_components/ChargingData'
import "./ChargeDone_components/ChargingData.css";


function ChargeInProgress(props){
	const location = useLocation();

	const [shouldRender, setShouldRender] = useState(false)

  	const [isloading, setIsLoading] = useState(false)

/*  	const [kWhDelivered, setkWhDelivered]
	const [protocol, setProtocol]
	const [batteryPercentBegin, setBatteryPercentBegin]
	const [batterPercentEnd, setBatteryPercentEnd]
	const [chargingPrice, setChargingPrice]
	const [ID,setID]
	const [connectionTime, setConnectionTime]
	const [doneChargingTime, setDoneChargingTime]
*/
	const [data, setData] = useState()





	 useEffect( () => {

	 	if (location.state==undefined){
			props.history.push('/main/charging')
		} 
		else{
			setIsLoading(true)
    //  console.log(data, "hi")

      fetch(`http://localhost:8765/evcharge/api/charging/angrykoala333/${location.state.carID}`)
          .then(response => {
            if (response.ok){
              return response.json()
            }
            else {
              setIsLoading(false)
              setData(() => [])
              throw Error (response.statusText)
            }

          })
          .then(fetchedData => {
              setData(() => fetchedData[0])
              
              setIsLoading(false)

          })
          .catch(err => console.log(err))

          
          if (!shouldRender)
            setShouldRender(true)
            console.log(data)
		}
   
      
    
  }, [location])


	if (location.state!==undefined){
		return(

			<div className='chargeDone'>

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
				<Message />

				 {isloading? <BatteryLoading size={"large"} speed={1} color={'rgba(44, 200, 201, 1)'} style={{margingTop: '20px', borderColor: 'white', position: 'absolute', left: '50%', top:' 30%', transform: 'translate(-50%,-50%)'}} /> : null}
	
				 {typeof data !=='undefined'  &&  data.length!==0 && !isloading? (
					<ChargingData check={0} data={data} paymentWay={location.state.paymentWay} money={location.state.money}/>
			      ) : null}

      			{typeof data ==='undefined' && !isloading && shouldRender? <ChargingData check={1} /> : null}

				

				{location.state.paymentWay=='card_in_app' ?
				<div className='container1'>
				 {typeof data !=='undefined'  &&  data.length!==0 && !isloading? <button className='charging_button' onClick={()=>{props.history.push('/main')}}>Return to homepage</button> : null}
				  {typeof data !=='undefined'  &&  data.length!==0 && !isloading? <button className='charging_button2'>Continue to payment</button> : null}
				</div> 
				: typeof data !=='undefined'  &&  data.length!==0 && !isloading? <button className='charging_button_alone' onClick={()=>{props.history.push('/main')}}>Return to homepage</button> : null }
			</div>
		)
	}
	else return(
			<h1>Redirecting...</h1>
		)
}

export default ChargeInProgress