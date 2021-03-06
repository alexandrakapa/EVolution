import React, { useEffect, useState } from 'react';
import {FormStyle} from './Energy_Demand_Forecasts_components/FormStyling'
import Form from './Energy_Demand_Forecasts_components/Form';
import {BatteryLoading} from 'react-loadingg'
import ShowResult from './Energy_Demand_Forecasts_components/Show_Result'
import '../../MainSuppliers.css';
import Charts from './Energy_Demand_Forecasts_components/Chart'


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

      fetch(`http://localhost:8765/evcharge/api/EnergyDemandForecast/11/${startdate}/${enddate}`)
          .then(response => response.json())
          .then(fetchedData => {
              if(startdate==enddate|| endate=2018 || startdate=2020){
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
              setData(() => fetchedData[4+enddate-2018])
              let tmp=[]
              var i
              let end=4+enddate-2018
              for (i=0; i<=end; i++){
                  console.log(fetchedData[i])
                  tmp.push(fetchedData[i])
              }
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

  return (
    <div className='energy_demand_forecasts' >
      <FormStyle >
        <Form setStartDate={setStartDate} setEndDate={setEndDate}  setDidSubmit={setDidSubmit}/>
      </FormStyle>

      {typeof data !=='undefined'  &&  general.length!==0 && !isloading? (
<Charts check={0} name={general[1]} start_date={general[2]} end_date={general[3]}  January={general[4]}  February={general[5]} March={general[6]}  April={general[7]} May= {general[8]} June={general[9]} July={general[10]} August={general[11]} September={general[12]} October={general[13]} November={general[14]} December={general[15]}/>
) : null}

      {typeof data ==='undefined' && !isloading && shouldRender? <ShowResult check={1} /> : null}
      <br />
      <br />
      {isloading? <BatteryLoading size={"large"} speed={1} color={'#99cc00'} style={{margingTop: '20px', borderColor: '#99cc00', position: 'absolute', left: '50%', transform: 'translate(-50%,-50%)'}} /> : null}
    </div>

  );



}

export default EnergyDemand;
