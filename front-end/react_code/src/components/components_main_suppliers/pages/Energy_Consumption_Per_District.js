import React, { useEffect, useState } from 'react';
import {FormStyle} from './Energy_Consumption_Per_District_components/FormStyling'
import Form from './Energy_Consumption_Per_District_components/Form';
import {BatteryLoading} from 'react-loadingg'
import ShowResult from './Energy_Consumption_Per_District_components/Show_Result'
import '../../MainSuppliers.css';

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
      const tok = localStorage.getItem('token');

      fetch(`http://localhost:8765/evcharge/api/SessionsPerProvider/PerDistrict/${localStorage.id}/${region}/${startdate}/${enddate}`,{headers:{'Content-type':'application/json','x-access-token':tok}
      })
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
  return (

    <div className='energy_consumption_per_district' >
      <FormStyle >
        <Form setStartDate={setStartDate} setEndDate={setEndDate} setRegion={setRegion} setDidSubmit={setDidSubmit}/>
      </FormStyle>

      {typeof data !=='undefined'  &&  data.length!==0 && !isloading? (
<ShowResult check={0} name={general[1]} start_date={general[2]} end_date={general[3]} region={general[4]} result={general[5]}  />
) : null}

      {typeof data ==='undefined' && !isloading && shouldRender? <ShowResult check={1} /> : null}
      <br />
      <br />
      {isloading? <BatteryLoading size={"large"} speed={1} color={'#99cc00'} style={{margingTop: '50px', borderColor: '#99cc00', position: 'absolute', left: '50%', transform: 'translate(-50%,-50%)'}} /> : null}
    </div>

  );



}

export default EnergyConsPerDistrict;
