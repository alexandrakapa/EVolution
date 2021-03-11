import React, { useEffect } from "react";
import Chart from "chart.js";


export default function Charts(props) {

  const check=props.check;
  const name= props.name;
  const start_date=props.start_date;
  const end_date=props.end_date;

  console.log(end_date.PeriodTo);


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
  const avg=(january[1].TotalEnergyDelivered+ february[1].TotalEnergyDelivered+ march[1].TotalEnergyDelivered+ april[1].TotalEnergyDelivered+ may[1].TotalEnergyDelivered+ june[1].TotalEnergyDelivered+july[1].TotalEnergyDelivered+august[1].TotalEnergyDelivered+september[1].TotalEnergyDelivered+october[1].TotalEnergyDelivered+november[1].TotalEnergyDelivered+december[1].TotalEnergyDelivered)/12;

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
            data: [january[1].TotalEnergyDelivered, february[1].TotalEnergyDelivered, march[1].TotalEnergyDelivered, april[1].TotalEnergyDelivered, may[1].TotalEnergyDelivered, june[1].TotalEnergyDelivered,july[1].TotalEnergyDelivered,august[1].TotalEnergyDelivered,september[1].TotalEnergyDelivered,october[1].TotalEnergyDelivered,november[1].TotalEnergyDelivered,december[1].TotalEnergyDelivered],
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
                        return value + ' kWh' ;
                    },
                  fontColor: "black",
                }
            }],
          xAxes:[{
            ticks:{
              fontColor: "black"
            }
          }]
        },
        title: {
            display: true,
            fontColor: "black",
            fontSize: 30,
            text: 'Energy Demand at '+ end_date.PeriodTo
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
          background: 'rgba(255,222,205,0.91848807882528)',
          padding: '.5rem',
          borderRadius: '5px'
        }} >
      <canvas id="myChart" width="500" height="500"  />
        <p style= {{
          fontSize:'30px',
          fontStyle: 'italic',
          textAlign: 'center',
          color: 'black'
      }} > The average is {Math.round(avg*100)/100} kWh  </p>
    </div>
  );
}
