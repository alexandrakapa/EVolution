import React, { useEffect } from "react";
import Chart from "chart.js";


export default function ChartsPieYear3(props) {

  const check=props.check;
  const name= props.name;
  const start_date=props.start_date;
  const end_date=props.end_date;
  const year1=props.Year1;
  const year2=props.Year2;
  const year3=props.Year3;
  const avg=(year1[1].TotalEnergyDelivered+ year2[1].TotalEnergyDelivered+year3[1].TotalEnergyDelivered)/2;

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [year1[0].Year, year2[0].Year,year3[0].Year],
        datasets: [
          {
            data: [year1[1].TotalEnergyDelivered, year2[1].TotalEnergyDelivered,year3[1].TotalEnergyDelivered] ,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            hoverBackgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
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
              fontColor: "white",
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
                 return currentValue+ 'kWh' + ' (' + percentage + '%)';
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
          background: 'rgba(0, 27, 45, 0.9)',
          padding: '.5rem',
          borderRadius: '5px'
        }} >
      <canvas id="myChart" width="500" height="500"  />
        <p style= {{
          fontSize:'30px',
          fontStyle: 'italic',
          textAlign: 'center'
      }} > The average is {Math.round(avg*100)/100} kWh  </p>
    </div>
  );
}
