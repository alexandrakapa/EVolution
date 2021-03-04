// import React from 'react';
// import '../../MainSuppliers.css';
//
// export default function EnergyConsPerDistrict() {
//   return <h1 className='energy_consumption_per_district'>LIKE & SUBSCRIBE</h1>;
// }



// import React from 'react';
//
// export default function ChargingSessions() {
//   return (
//     <>
//       <h1 className='charging_sessions'>MARKETING</h1>
//     </>
//   );
// }


import React, { useEffect, useState } from 'react';
import Top from './ChargingSessions_components/Top';
import {FormStyle} from './ChargingSessions_components/FormStyling'
import Form from './ChargingSessions_components/Form';
import  Muitable  from "./MuidataTable";
import {columns} from './ChargingSessions_components/ChargingSessionsTableColumns'
import {BatteryLoading} from 'react-loadingg'


function EnergyConsPerDistrict(props) {

  const [startdate, setStartDate] = useState([])
  const [enddate, setEndDate] = useState([])
  const [region, setRegion] = useState([])

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

      fetch(`http://localhost:8765/evcharge/api/SessionsPerProvider/PerDistrict/3/${region}/${startdate}/${enddate}`)
          .then(response => response.json())
          .then(fetchedData => {
              setData(() => fetchedData[5])
              let tmp=[]
              var i
              for (i=0; i<=5; i++){
                  console.log(fetchedData[i])
                  tmp.push(fetchedData[i])
              }
              setGeneral(() => tmp)
              console.log("hi")
              console.log(fetchedData[5])
              console.log("end of hi")
              setIsLoading(false)

          })
          .catch(err => console.log(err))
          setDidSubmit(false)
          if (!shouldRender)
            setShouldRender(true)
    }
  }, [didSubmit])
  console.log(general);
  return (
    <div >
      <FormStyle className='chargingsessions' >
        <Form setStartDate={setStartDate} setEndDate={setEndDate} setRegion={setRegion} setDidSubmit={setDidSubmit}/>
      </FormStyle>

      {data.length!==0 && !isloading?
        <div>
            {general.map(data => <div>{data.SupplierName}</div>)}
            <h1> Total Energy Delivered </h1>
            <h2> {general.map(data => <div> {data.TotalEnergyDelivered}</div>)} </h2>
          </div>

        : null}
      {data.length===0 && !isloading && shouldRender? <h2>No data</h2> : null}
      <br />
      <br />
      {isloading? <BatteryLoading size={"large"} speed={1} color={'#99cc00'} style={{margingTop: '20px', borderColor: '#99cc00', position: 'absolute', left: '50%', transform: 'translate(-50%,-50%)'}} /> : null}
    </div>

  );



}

export default EnergyConsPerDistrict;
