import React, { useEffect, useState } from 'react';
import '../../MainManufacturers.css';
import {ProfStyle} from './ProfileManufacturerStyling'
import  { AiOutlineMail,AiFillPhone,AiOutlineEuroCircle } from "react-icons/ai";
import { IoMdBusiness } from "react-icons/io";
import { IconContext } from "react-icons"
import { GoTools } from "react-icons/go";
function ProfileManufacturer(props) {

const [data, setData] = useState([])
useEffect( () => {
    const tok = localStorage.getItem('token');
fetch(`https://localhost:8765/evcharge/api/admin/users/${localStorage.username}`,{headers:{'Content-type':'application/json','x-access-token':tok}})
  .then(response => response.json())
         .then(fetchedData => {

             setData(() => fetchedData[0])

                console.log(fetchedData[0])
            })

},[])


  return (
    <div className="profile_man">
    <ProfStyle>
    <IconContext.Provider value={{color:"forestgreen", size : "3em"}}>
    <div class="ribbon">
    {data.company_name}    <GoTools color="#f1f1f1" size="1em"/>
</div>

    <div class="row">
    <div class="column_1">
      <div class="card">
        <AiOutlineMail/><h2>Email</h2>
        <p>{data.email}</p>
        <br/>
        <br/>
        <br/>
      </div>
    </div>

    <div class="column_3">
      <div class="card">
        <AiFillPhone/><h2>Phone number</h2>
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
export default ProfileManufacturer;
