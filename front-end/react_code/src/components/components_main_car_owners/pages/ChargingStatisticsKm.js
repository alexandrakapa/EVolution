import React, { useEffect, useState } from 'react';
import {FormStyle} from './ChargingStatistics_Km_components/FormStyling'
import Form from './ChargingStatistics_Km_components/Form';
import VideoCharge from './videos/video_charge.mp4'
import {BatteryLoading} from 'react-loadingg'
import '../../MainCarOwners.css';
import Charts from './ChargingStatistics_Km_components/Chart'
import "./ChargingStatistics_Km_components/Show_Result.css";

function ChargingStatisticsKm(props) {

  const [startdate, setStartDate] = useState([])

  const [data, setData] = useState([])
  const [general, setGeneral] = useState([])

  const [shouldRender, setShouldRender] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const [isloading, setIsLoading] = useState(false)

  function handleClick(){
    props.history.push(
      {
        pathname: '/charging_statistics_km',

      }
    )
  }

  useEffect( () => {
    if (didSubmit){
      setIsLoading(true)
      const tok = localStorage.getItem('token');

      fetch(`https://localhost:8765/evcharge/api/ChargingStatisticsKm/${localStorage.username}/${startdate}`,{headers:{'Content-type':'application/json','x-access-token':tok}})
          .then(response => response.json())
          .then(fetchedData => {
              if(startdate==2018|| startdate==2019 || startdate==2020){
              setData(() => fetchedData[13])
              let tmp=[]
              var i
              for (i=0; i<=13; i++){
                  console.log(fetchedData[i])
                  tmp.push(fetchedData[i])
              }
              setGeneral(() => tmp)
              setIsLoading(false)
            }
            else{
              let tmp=[]
              setGeneral(() => tmp)
              setIsLoading(false)
            }
          })
          .catch(err => console.log(err))
          setDidSubmit(false)
          if (!shouldRender)
            setShouldRender(true)

    }
  }, [didSubmit])
  console.log(general.length)
  return (
		<div className='charging_statistics_km'>
      <FormStyle >
        <Form setStartDate={setStartDate} setDidSubmit={setDidSubmit}/>
      </FormStyle>
      {typeof data !=='undefined'  &&  general.length===14 && !isloading? (
        <Charts  name={general[0]} start_date={general[1]}  January={general[2]}  February={general[3]} March={general[4]}  April={general[5]} May= {general[6]} June={general[7]} July={general[8]} August={general[9]} September={general[10]} October={general[11]} November={general[12]} December={general[13]}/>
				) : null}

      {general.length===0 && !isloading && shouldRender? (<div className='forms_charging_km'>
    <p className='h13_new_charging_km'> No data available  </p>

       </div>) : null}
      <br />
      <br />

      {isloading? <BatteryLoading size={"large"} speed={1} color={'rgba(0,27,45,0.8)'} style={{margingTop: '80px', borderColor: 'rgba(0,27,45,0.8)', position: 'absolute', left: '50%', transform: 'translate(-50%,-50%)'}} /> : null}
    </div>

  );



}

export default ChargingStatisticsKm;
