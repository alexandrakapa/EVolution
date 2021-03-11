import React, { useEffect, useState } from 'react';
import '../../MainSuppliers.css';
import {ProfStyle} from './ProfileSupplierStyling'
import  { AiOutlineMail,AiFillPhone,AiOutlineEuroCircle } from "react-icons/ai";
import { IoMdBusiness } from "react-icons/io";
import { IconContext } from "react-icons"
import { BsFillLightningFill } from "react-icons/bs";
function ProfileSupplier(props) {

const [data, setData] = useState([])
useEffect( () => {
    const tok = localStorage.getItem('token');
fetch(`http://localhost:8765/evcharge/api/admin/users/${localStorage.username}`,{headers:{'Content-type':'application/json','x-access-token':tok}})
  .then(response => response.json())
         .then(fetchedData => {

             setData(() => fetchedData[0])
                console.log(fetchedData[0])

            })

},[])


  return (
    <div className="profile_sup">
    <ProfStyle>
    <IconContext.Provider value={{color:"#ce897b", size : "3em"}}>
    <div class="ribbon">
    {data.username}   <BsFillLightningFill color="#f1f1f1" size="1em"/>
</div>

    <div class="row">
    <div class="column">
      <div class="card">
        <AiOutlineMail/><h2>Email</h2>
        <br/>
        <br/>
        <p>{data.email}</p>
        <br/>
        <br/>
        <br/>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <AiFillPhone/><h2>Phone number</h2>
        <br/>
        <br/>
        <p>{data.phone}</p>
        <br/>
        <br/>
        <br/>
      </div>
    </div>
  </div>

  <div class="row">
  <div class="column_2">
    <div class="card">
      <IoMdBusiness/><h2>Company name</h2>
      <br/>
      <br/>
      <p>{data.company_name}</p>
      <br/>
      <br/>
      <br/>
    </div>
  </div>

  </div>
    </IconContext.Provider>
    </ProfStyle>
    </div>
  );


}
export default ProfileSupplier;
