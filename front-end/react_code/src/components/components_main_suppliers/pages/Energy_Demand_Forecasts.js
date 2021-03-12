import React, { useEffect, useState } from 'react';
import {FormStyle} from './Energy_Demand_Forecasts_components/FormStyling'
import Form from './Energy_Demand_Forecasts_components/Form';
import {BatteryLoading} from 'react-loadingg'
import '../../MainSuppliers.css';
import Charts from './Energy_Demand_Forecasts_components/Chart'
import ChartsPieYear2 from './Energy_Demand_Forecasts_components/ChartPieYears2'
import ChartsPieYear3 from './Energy_Demand_Forecasts_components/ChartPieYears3'
import "./Energy_Demand_Forecasts_components/Show_Result.css";



function EnergyDemand(props) {

  const [startdate, setStartDate] = useState([])
  const [enddate, setEndDate] = useState([])

  const [data, setData] = useState([])
  const [general, setGeneral] = useState([])

  const [shouldRender, setShouldRender] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const [isloading, setIsLoading] = useState(false)

  function handleClick(){
    props.history.push(
      {
        pathname: '/energy_consumption_per_district',

      }
    )
  }

  useEffect( () => {
    if (didSubmit){
      setIsLoading(true)
      const tok = localStorage.getItem('token');

      fetch(`https://localhost:8765/evcharge/api/EnergyDemandForecast/${localStorage.id}/${startdate}/${enddate}`,{headers:{'Content-type':'application/json','x-access-token':tok}})
          .then(response => response.json())
          .then(fetchedData => {
              if(startdate==enddate|| enddate==2018 || startdate==2020){
              setData(() => fetchedData[15])
              let tmp=[]
              var i
              for (i=0; i<=15; i++){
                  console.log(fetchedData[i])
                  tmp.push(fetchedData[i])
              }
              setGeneral(() => tmp)
              setIsLoading(false)
            }
            else{
              if(enddate<2018){
                let tmp=[]
                setGeneral(() => tmp)
                setIsLoading(false)
              }
              else if (enddate<=2020){
               if (startdate<=2018){
                console.log("case 1")
              let end=4+parseInt(enddate)-2018
              setData(() => fetchedData[end])
              let tmp=[]
              var i
              for (i=0; i<=end; i++){
                  console.log(fetchedData[i])
                  tmp.push(fetchedData[i])
              }
              setGeneral(() => tmp)
              setIsLoading(false)
            }
            else if ( startdate >2018 ){
              console.log("case 2")
              let end=4+parseInt(enddate)-parseInt(startdate)
              setData(() => fetchedData[end])
              let tmp=[]
              var i
              for (i=0; i<=end; i++){
                  console.log(fetchedData[i])
                  tmp.push(fetchedData[i])
              }
              setGeneral(() => tmp)
              setIsLoading(false)

            }
          }
          else if (enddate>2020){
            if (startdate<2018 ){
              console.log("case 3")
              let end=4+2020-2018
              setData(() => fetchedData[end])
              let tmp=[]
              var i
              for (i=0; i<=end; i++){
                  console.log(fetchedData[i])
                  tmp.push(fetchedData[i])
              }
              setGeneral(() => tmp)
              setIsLoading(false)

            }
            else{
              let end=4+2020-parseInt(startdate)
              setData(() => fetchedData[end])
              let tmp=[]
              var i
              for (i=0; i<=end; i++){
                  console.log(fetchedData[i])
                  tmp.push(fetchedData[i])
              }
              setGeneral(() => tmp)
              setIsLoading(false)
            }

          }
          if(startdate>2020){
              let tmp=[]
              setGeneral(() => tmp)
              setIsLoading(false)
            }

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
    <div className='energy_demand_forecasts' >
      <FormStyle >
        <Form setStartDate={setStartDate} setEndDate={setEndDate}  setDidSubmit={setDidSubmit}/>
      </FormStyle>

      {typeof data !=='undefined'  &&  general.length===16 && !isloading? (
        <Charts check={0} name={general[1]} start_date={general[2]} end_date={general[3]}  January={general[4]}  February={general[5]} March={general[6]}  April={general[7]} May= {general[8]} June={general[9]} July={general[10]} August={general[11]} September={general[12]} October={general[13]} November={general[14]} December={general[15]}/>
        ) : null}

      {general.length===6  && !isloading && shouldRender? (
        <ChartsPieYear2 check={0} name={general[1]}  start_date={general[2]} end_date={general[3]} Year1={general[4]} Year2={general[5]} />
        ) : null}

        {general.length===7  && !isloading && shouldRender? (
          <ChartsPieYear3 check={0} name={general[1]}  start_date={general[2]} end_date={general[3]} Year1={general[4]} Year2={general[5]} Year3={general[6]}/>
          ) : null}

      {general.length===0 && !isloading && shouldRender? (<div className='forms'>
    <p className='h13_new'> No data available  </p>

       </div>) : null}
      <br />
      <br />

      {isloading? <BatteryLoading size={"large"} speed={1} color={'rgba(0, 27, 45, 0.9)'} style={{margingTop: '80px', borderColor: 'rgba(0, 27, 45, 0.9)', position: 'absolute', left: '50%', transform: 'translate(-50%,-50%)'}} /> : null}
    </div>

  );



}

export default EnergyDemand;
