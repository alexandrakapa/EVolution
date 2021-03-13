import React, { useEffect } from "react";
import Chart from "chart.js";


export default function Charts2(props) {

  const start_date=props.start_date;
  console.log(start_date);

  const january= props.January;
  const february= props.February;
  const march=props.March;
  const april= props.April;
  const may= props.May;
  const june=props.June;
  const july= props.July;
  const august= props.August;
  const september=props.September;
  const october= props.October;
  const november= props.November;
  const december=props.December;
  const avg=(january[1].Total_Charging_Sum+ february[1].Total_Charging_Sum+ march[1].Total_Charging_Sum+ april[1].Total_Charging_Sum+ may[1].Total_Charging_Sum+ june[1].Total_Charging_Sum+july[1].Total_Charging_Sum+august[1].Total_Charging_Sum+september[1].Total_Charging_Sum+october[1].Total_Charging_Sum+november[1].Total_Charging_Sum+december[1].Total_Charging_Sum)/12;

  const axes = React.useMemo(
  () => [
    { primary: true, type: 'time', position: 'bottom' },
    { type: 'linear', position: 'left' }
  ],
  []
)

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
        datasets: [
          {
            label:" hi",
            data: [january[1].Total_Charging_Sum, february[1].Total_Charging_Sum, march[1].Total_Charging_Sum, april[1].Total_Charging_Sum, may[1].Total_Charging_Sum, june[1].Total_Charging_Sum,july[1].Total_Charging_Sum,august[1].Total_Charging_Sum,september[1].Total_Charging_Sum,october[1].Total_Charging_Sum,november[1].Total_Charging_Sum,december[1].Total_Charging_Sum],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(11,209,18,1)',
                'rgba(11,35,209,1)',
                'rgba(127,11,209,1)',
                'rgba(187,11,209,1)',
                'rgba(195,209,11,1)',
                'rgba(209,134,11,1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(11,209,18,1)',
                'rgba(11,35,209,1)',
                'rgba(127,11,209,1)',
                'rgba(187,11,209,1)',
                'rgba(195,209,11,1)',
                'rgba(209,134,11,1)'
            ],
            hoverBackgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(11,209,18,1)',
              'rgba(11,35,209,1)',
              'rgba(127,11,209,1)',
              'rgba(187,11,209,1)',
              'rgba(195,209,11,1)',
              'rgba(209,134,11,1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return value + '‎€' ;
                    },
                  fontColor: "white",
                }
            }],
          xAxes:[{
            ticks:{
              fontColor: "white"
            }
          }]
        },
        title: {
            display: true,
            fontColor: "white",
            fontSize: 30,
            text: 'Charging Cost at '+ start_date.PeriodFrom
        },
        legend: {
            display: false
          },
          tooltips: {
             callbacks: {
                label: function(tooltipItem) {
                       return tooltipItem.yLabel;
                }
             }
          }
    }
});
  });
  return (
    <div  style={{
          background: 'rgba(0,27,45,0.8)',
          padding: '.5rem',
          borderRadius: '5px'
        }} >
      <canvas id="myChart" width="500" height="500"  />
        <p style= {{
          fontSize:'30px',
          fontStyle: 'italic',
          textAlign: 'center',
          color: 'white'
      }} > The average is {Math.round(avg*100)/100} km  </p>
    </div>
  );
}
