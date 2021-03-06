import React, { useEffect } from "react";
import Chart from "chart.js";


export default function Charts(props) {

  const check=props.check;
  const name= props.name;
  const start_date=props.start_date;
  const end_date=props.end_date;



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

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
        datasets: [
          {
            label: "# of kWh",
            data: [january[1].TotalEnergyDelivered, february[1].TotalEnergyDelivered, march[1].TotalEnergyDelivered, april[1].TotalEnergyDelivered, may[1].TotalEnergyDelivered, june[1].TotalEnergyDelivered,july[1].TotalEnergyDelivered,august[1].TotalEnergyDelivered,september[1].TotalEnergyDelivered,october[1].TotalEnergyDelivered,november[1].TotalEnergyDelivered,december[1].TotalEnergyDelivered],
            backgroundColor: [
              'rgba(5,94,8,1)',

            ],
            borderColor: ['rgba(5,94,8,1)', "Blue", "Yellow", "Green", "Purple", "Orange"],
            borderWidth: 1
          }
        ]
      }
    });
  });


  console.log(january[1].TotalEnergyDelivered)
  return (
    <div >
      <canvas id="myChart" width="400" height="400" />
    </div>
  );
}
