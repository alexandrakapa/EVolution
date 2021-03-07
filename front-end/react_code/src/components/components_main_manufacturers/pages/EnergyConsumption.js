
import React, { useEffect, useState } from 'react';
import {FormStyle} from './EnergyConsumption_components/FormStyling'
import Form from './EnergyConsumption_components/Form';
import  Muitable  from "./MuidataTable";
import {columns} from './EnergyConsumption_components/EnergyConsumptionTableColumns'
import {BatteryLoading} from 'react-loadingg'
import BarCHart from './EnergyConsumption_components/BarChart';
import NoData from './NoData'

function EnergyConsumption(props) {

  const [startdate, setStartDate] = useState([])
  const [enddate, setEndDate] = useState([])


  const [data, setData] = useState([])
  //const [general, setGeneral] = useState([])

  const [shouldRender, setShouldRender] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const [isloading, setIsLoading] = useState(false)


  useEffect( () => {
    if (didSubmit){
      setIsLoading(true)

      var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("manufacturer", "Tesla");
        urlencoded.append("start_date", startdate);
        urlencoded.append("end_date", enddate);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost:8765/report_consumption", requestOptions)
        //.then(response => response.text())
        //.then(result => console.log(result))

      //fetch(`http://localhost:8765/evcharge/api/EnergyCost/Total/${startdate}/${enddate}`)
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
              setData(() => fetchedData)
            //  let tmp=[]
            //  var i
             // for (i=0; i<2; i++){
             //     tmp.push(fetchedData[i])
             // }
             // setGeneral(() => tmp)

              console.log(fetchedData)

              setIsLoading(false)

          })
          .catch(err => console.log(err))
         
          setDidSubmit(false)
          if (!shouldRender)
            setShouldRender(true)
            console.log(data)
    }
  }, [didSubmit])


  return (
    <div >
      <FormStyle className='energyConsumption' >
        <Form setStartDate={setStartDate} setEndDate={setEndDate} setDidSubmit={setDidSubmit}/>
      </FormStyle>
      {data.length!==0 && !isloading? <div style={{float:'left', paddingLeft: '12%', marginRight: '0%', marginTop: '20px'}}><Muitable data={data} tableName={"Energy consumption (kWh)"} columns={columns} /></div> : null}
      {data.length===0 && !isloading && shouldRender? <NoData /> : null}
      <br />
      <br />
      {isloading? <BatteryLoading size={"large"} speed={1} color={'#99cc00'} style={{margingTop: '20px', borderColor: '#99cc00', position: 'absolute', left: '50%', transform: 'translate(-50%,-50%)'}} /> : null}
      {data.length!==0 && !isloading?  <div style={{marginLeft: '55%', paddingRight: '0px'}}><BarCHart data={data} title={"Energy Consumption per car model (kWh)"}/></div>: null}
    </div>

  );



}

export default EnergyConsumption
