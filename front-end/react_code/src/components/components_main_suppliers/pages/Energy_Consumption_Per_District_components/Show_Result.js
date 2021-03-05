import React, { useState } from "react";
import { useTrail, animated as a } from "react-spring";
import "./Show_Result.css";

// function ShowResult() {
//   const [toggle, set] = useState(true);
//   const trail = useTrail(items.length, {
//     config,
//     opacity: toggle ? 1 : 0,
//     x: toggle ? 0 : 20,
//     height: toggle ? 80 : 0,
//     from: { opacity: 0, x: 20, height: 0 }
//   });
//
//   return (
//     <div className="trails-main" onClick={() => set(state => !state)}>
//       <div>
//         {trail.map(({ x, height, ...rest }, index) => (
//           <a.div
//             key={items[index]}
//             className="trails-text"
//             style={{
//               ...rest,
//               transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
//             }}
//           >
//             <a.div style={{ height }}>{items[index]}</a.div>
//           </a.div>
//         ))}
//       </div>
//     </div>
//   );

// <label className='label'> From: {start_date.} </label>
// <label className='label'> To: {end_date.}</label>
// }


function ShowResult(props) {
const name= props.name;
const start_date=props.start_date;
const end_date=props.end_date;
const region= props.region;
const result=props.result;
console.log(result.TotalEnergyDelivered);
  return ( <div className='form'>
<h1 className='h1'> Your results </h1>
<label className='label'> Company name: {name.SupplierName} </label>
<label className='label'> From: {start_date.PeriodFrom} </label>
<label className='label'> To: {end_date.PeriodTo}</label>
<label className='label'> Region: {region.Region} </label>
<label className='label1'> Total Energy Consumption: {result.TotalEnergyDelivered} kWh </label>
   </div>);
}


export default ShowResult;
