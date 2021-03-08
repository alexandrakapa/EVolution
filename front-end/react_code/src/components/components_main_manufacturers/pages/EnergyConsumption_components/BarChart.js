import './BarChart.css'
import React from 'react'
import ReactDom from 'react-dom'

function BarGroup(props) {
    let barPadding = 2
    let barColour = '#006400'
    //let widthScale = d => (d - props.minval) * 300 / (props.maxval-props.minval)
    let widthScale = d => d  * 300 / props.maxval
  
    let width = widthScale(props.d.EnergyConsumption)
    let yMid = props.barHeight * 0.5
    
    return <g className="bar-group">
      <text className="name-label" x="-5" y={yMid} alignmentBaseline="middle" >{props.d.Model}</text>
      <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
      <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.EnergyConsumption}</text>
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
*/    console.log(props.data)
      let barHeight = 30
       console.log(props.data[0].EnergyConsumption)   
      var i
      var maxval=0
  //    var minval=props.data[0].EnergyConsumption
      for (i=0; i<props.data.length; i++){
        if (maxval<props.data[i].EnergyConsumption){
          maxval=props.data[i].EnergyConsumption
        }
   //     if (minval>props.data[i].EnergyConsumption){
   //       minval=props.data[i].EnergyConsumption
    //    }
      }
      let barGroups = props.data.map((d,i) => <g transform={`translate(0, ${i * barHeight})`}>
                                                      <BarGroup maxval={maxval} d={d} barHeight={barHeight} />
                                                    </g>)                         
      
      return (
       <svg width="800" height={props.data.length*100} >
        <g >
          <text className="title" x="10" y="20">{props.title}</text>
          <g className="chart" transform="translate(100,50)">
            {barGroups}
          </g>
        </g>
      </svg>
      )
    }
  
export default BarChart