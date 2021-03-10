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


function ChargingSessions(props) {

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
        pathname: '/chargingevents',

      }
    )
  }

  useEffect( () => {
    if (didSubmit){
      setIsLoading(true)
      const tok = localStorage.getItem('token');

      fetch(`http://localhost:8765/evcharge/api/SessionsPerManufacturer/3/${region}/${startdate}/${enddate}`,{headers:{'Content-type':'application/json','x-access-token':tok}})
          .then(response => response.json())
          .then(fetchedData => {
              setData(() => fetchedData[6])
              let tmp=[]
              var i
              for (i=0; i<6; i++){
                  tmp.push(fetchedData[i])
              }
              setGeneral(() => tmp)

              console.log(fetchedData[6])

              setIsLoading(false)

          })
          .catch(err => console.log(err))
          setDidSubmit(false)
          if (!shouldRender)
            setShouldRender(true)
    }
  }, [didSubmit])


  return (
    <div >
      <FormStyle className='chargingsessions' >
        <Form setStartDate={setStartDate} setEndDate={setEndDate} setRegion={setRegion} setDidSubmit={setDidSubmit}/>
      </FormStyle>
      {data.length!==0 && !isloading? <Muitable data={data} tableName={"Charging Sessions"} columns={columns} /> : null}
      {data.length===0 && !isloading && shouldRender? <h2>No data</h2> : null}
      <br />
      <br />
      {isloading? <BatteryLoading size={"large"} speed={1} color={'#99cc00'} style={{margingTop: '20px', borderColor: '#99cc00', position: 'absolute', left: '50%', transform: 'translate(-50%,-50%)'}} /> : null}
    </div>

  );



}

export default ChargingSessions;
