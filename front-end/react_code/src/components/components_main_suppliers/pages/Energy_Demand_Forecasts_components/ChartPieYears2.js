import React, { useEffect } from "react";
import Chart from "chart.js";


export default function ChartsPieYear2(props) {

  const check=props.check;
  const name= props.name;
  const start_date=props.start_date;
  const end_date=props.end_date;
  const year1=props.Year1;
  const year2=props.Year2;
  const avg=(year1[1].TotalEnergyDelivered+ year2[1].TotalEnergyDelivered)/2;

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [year1[0].Year, year2[0].Year],
        datasets: [
          {
            data: [year1[1].TotalEnergyDelivered, year2[1].TotalEnergyDelivered] ,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
              ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            hoverBackgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: 'right',
          labels: {
            padding: 20,
            boxWidth: 10
          }
        },
          title: {
              display: true,
              fontColor: "black",
              fontSize: 25,
              text: 'Energy Demand at Period '+ start_date.PeriodFrom + '-' + end_date.PeriodTo
          },
          tooltips: {
             callbacks: {
               label: function(tooltipItem, data) {
                 var dataset = data.datasets[tooltipItem.datasetIndex];
                 var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                 var total = meta.total;
                 var currentValue = dataset.data[tooltipItem.index];
                 var percentage = parseFloat((currentValue/total*100).toFixed(1));
                 return currentValue + ' (' + percentage + '%)';
               },
               title: function(tooltipItem, data) {
                 return data.labels[tooltipItem[0].index];
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
    }} > The average Energy Demand is {Math.round(avg*100)/100} kWh  </p>
    <ul>
    { year1[1].TotalEnergyDelivered < year2[1].TotalEnergyDelivered ?
      <li style= {{
      fontSize:'20px',
      fontStyle: 'italic',
      textAlign: 'center',
      color: 'black'
  }} > At {year1[0].Year} - {year2[0].Year} Energy Demand raised per {Math.round((-year1[1].TotalEnergyDelivered+year2[1].TotalEnergyDelivered)*100)/100 } kWh </li> :
  <li style= {{
          fontSize:'20px',
          fontStyle: 'italic',
          textAlign: 'center',
          color: 'black'
      }} > At {year1[0].Year} - {year2[0].Year} Energy Demand declined per {Math.round((year1[1].TotalEnergyDelivered-year2[1].TotalEnergyDelivered)*100)/100 } kWh </li>
}
</ul>
    </div>
  );
}
