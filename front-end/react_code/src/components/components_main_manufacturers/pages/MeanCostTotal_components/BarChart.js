import './BarChart.css'
import React from 'react'
import ReactDom from 'react-dom'

function BarGroup(props) {
    let barPadding = 2
    let barColour = '#006400'
    let widthScale = d => d * 1000000
  
    let width = widthScale(props.d.EnergyCostPerKm)
    let yMid = props.barHeight * 0.5
    
    return <g className="bar-group">
      <text className="name-label" x="-5" y={yMid} alignmentBaseline="middle" >{props.d.ManufacturerName}</text>
      <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
      <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.EnergyCostPerKm}</text>
    </g>
  }
  
/*  class BarChart extends React.Component {
    state = {
      data: [
        { name: 'Mon', value: 20 },
        { name: 'Tue', value: 40 },
        { name: 'Wed', value: 35 },
        { name: 'Thu', value: 50 },
        { name: 'Fri', value: 55 },
        { name: 'Sat', value: 40 },
        { name: 'Sun', value: 30 }
      ]
    }
 */ 
    function BarChart(props) {
    //render() {
      /*  const data= [
            { name: 'Mon', value: 20 },
            { name: 'Tue', value: 40 },
            { name: 'Wed', value: 35 },
            { name: 'Thu', value: 50 },
            { name: 'Fri', value: 55 },
            { name: 'Sat', value: 40 },
            { name: 'Sun', value: 30 }
          ]
*/
      let barHeight = 30
       console.log(props.data)   
      let barGroups = props.data.map((d,i,a,b) => <g transform={`translate(0, ${i * barHeight})`}>
                                                      <BarGroup d={d} barHeight={barHeight} />
                                                    </g>)                         
      
      return (
       <svg width="800" height={props.data.length*33} >
        <g className="container">
          <text className="title" x="40" y="20">{props.title}</text>
          <g className="chart" transform="translate(100,50)">
            {barGroups}
          </g>
        </g>
      </svg>
      )
    }
  
export default BarChart