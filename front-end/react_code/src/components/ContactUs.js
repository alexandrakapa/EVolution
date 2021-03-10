// import React from 'react';
// import '../../MainSuppliers.css';
//
// export default function ContactUs() {
//   return <h1 className='contact-us'>CONTACT</h1>;
// }


import React, { useEffect, useState } from 'react';
import {FormStyle} from './Contact/FormStyling'
import Form from './Contact/Form';
import {BatteryLoading} from 'react-loadingg'
import './MainSuppliers.css';
import "./Contact/Show_Result.css";
import NavbarHome from './NavbarHome';



function ContactUs(props) {

  const [fullname, setfullname] = useState([])
  const [email, setemail] = useState([])

  const [data, setData] = useState([])
  const [general, setGeneral] = useState([])

  const [shouldRender, setShouldRender] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const [isloading, setIsLoading] = useState(false)

  return (
    <div>
    <NavbarHome />
    <div className='contact-us1' >
      <FormStyle >
        <Form setfullname={setfullname} setemail={setemail}  setDidSubmit={setDidSubmit}/>
      </FormStyle>

</div>
</div>
)
}
export default ContactUs;
