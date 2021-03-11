import './BarChart.css'
import React from 'react'
import ReactDom from 'react-dom'

function BarGroup(props) {
    let barPadding = 2
    let barColour = '#006400'
    //let widthScale = d => d * 1000000
    let widthScale = d => d  * 300 / props.maxval
    console.log(props.maxval)

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
      var maxval=0
      var i
//    var minval=props.data[0].EnergyConsumption
      for (i=0; i<props.data.length; i++){
        if (maxval<props.data[i].EnergyCostPerKm){
          maxval=props.data[i].EnergyCostPerKm
        }
      }
      let barHeight = 30
       console.log(props.data)
      let barGroups = props.data.map((d,i,a,b) => <g transform={`translate(0, ${i * barHeight})`}>
                                                      <BarGroup maxval={maxval} d={d} barHeight={barHeight} />
                                                    </g>)

      return (
       <svg width="500px" height={props.data.length*33} >
        <g >
          <text className="title" x="25" y="20">{props.title}</text>
          <g className="chart" transform="translate(100,50)">
            {barGroups}
          </g>
        </g>
      </svg>
      )
    }

export default BarChart


//<g classname="container"!!!!!!!!!!!!!!
