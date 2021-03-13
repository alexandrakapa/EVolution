import React, { useEffect, useState } from 'react';
import '../../MainCarOwners.css';
import {ProfStyle} from './ProfileOwnerStyling'
import  { AiOutlineMail,AiFillPhone,AiOutlineEuroCircle } from "react-icons/ai";
import {VscActivateBreakpoints} from "react-icons/vsc"
import { IconContext } from "react-icons"
import { FaUser } from "react-icons/fa";
function Profile(props) {

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
    <div className="profile_own">
    <ProfStyle>
    <IconContext.Provider value={{color:"rgba(0,27,45,0.9)", size : "3em"}}>
    <div class="ribbon">
    {data.username}     <FaUser color="#f1f1f1" size="1em"/>
</div>

    <div class="row">
    <div class="column">
      <div class="card">
        <AiOutlineMail/><h2>Email</h2>

        <p>{data.email}</p>
        <br/>
        <br/>
        <br/>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <AiFillPhone/><h2>Phone number</h2>

        <p>{data.phone_number}</p>
        <br/>
        <br/>
        <br/>
      </div>
    </div>
  </div>

  <div class="row">
  <div class="column">
    <div class="card">
      <AiOutlineEuroCircle/><h2>Amount owed</h2>

      <p>{data.price_to_pay}€</p>
      <br/>
      <br/>
      <br/>
    </div>
  </div>

  <div class="column">
    <div class="card">
    <VscActivateBreakpoints/><h2>Points earned</h2>
    <p>{data.points}</p>
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
export default Profile;
