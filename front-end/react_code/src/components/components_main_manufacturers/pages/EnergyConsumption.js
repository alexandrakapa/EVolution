
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

      const tok = localStorage.getItem('token');

      fetch(`http://localhost:8765/evcharge/api/report_consumption/${localStorage.company_name}/${startdate}/${enddate}`,{
         headers:{'Content-type':'application/json','x-access-token':tok}
      })

              //.then(response => response.text())
        //.then(result => console.log(result))

      //fetch(`http://localhost:8765/evcharge/api/EnergyCost/Total/${startdate}/${enddate}`)
          .then(response => {
            if (response.ok){
              console.log('ok')
              return response.json()
            }
            else {
              console.log("not ok")
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
      {data.length!==0 && !isloading?  <div style={{marginLeft: '56%', paddingRight: '5%'}}><BarCHart data={data} title={"Energy Consumption per car model (kWh)"}/></div>: null}
    </div>

  );



}

export default EnergyConsumption
