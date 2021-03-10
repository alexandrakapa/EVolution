import React, { useEffect, useState } from 'react';
import {FormStyle} from './MeanCostTotal_components/FormStyling'
import Form from './MeanCostTotal_components/Form';
import  Muitable  from "./MuidataTable";
import {columns} from './MeanCostTotal_components/MeanCostTotalTableColumns'
import {BatteryLoading} from 'react-loadingg'
import BarCHart from './MeanCostTotal_components/BarChart';
import NoData from './NoData'

function MeanCostTotal(props) {

  const [startdate, setStartDate] = useState([])
  const [enddate, setEndDate] = useState([])


  const [data, setData] = useState([])
  const [general, setGeneral] = useState([])

  const [shouldRender, setShouldRender] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const [isloading, setIsLoading] = useState(false)


  useEffect( () => {
    if (didSubmit){
      setIsLoading(true)

      fetch(`http://localhost:8765/evcharge/api/EnergyCost/Total/${startdate}/${enddate}`)
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
              setData(() => fetchedData[3])
              let tmp=[]
              var i
              for (i=0; i<2; i++){
                  tmp.push(fetchedData[i])
              }
              setGeneral(() => tmp)

              console.log(fetchedData[3])

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
      <FormStyle className='meanCostTotal' >
        <Form setStartDate={setStartDate} setEndDate={setEndDate} setDidSubmit={setDidSubmit}/>
      </FormStyle>
      {data.length!==0 && !isloading? <div style={{float:'left', marginLeft: '130px', marginRight: '0%', marginTop: '20px'}}><Muitable data={data} tableName={"Mean energy cost per km per Manufacturer"} columns={columns} /></div> : null}
      {data.length===0 && !isloading && shouldRender? <NoData /> : null}
      <br />
      <br />
      {isloading? <BatteryLoading size={"large"} speed={1} color={'#99cc00'} style={{margingTop: '20px', borderColor: '#99cc00', position: 'absolute', left: '50%', transform: 'translate(-50%,-50%)'}} /> : null}
      {data.length!==0 && !isloading?  <div style={{marginLeft: '54%', paddingRight: '5%'}}><BarCHart data={data} title={"Mean energy cost per km for Manufacturers"}/></div>: null}
    </div>

  );



}

export default MeanCostTotal;
