import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import FromStyle from './FormStyling'
import '../MainSuppliers.css'


function Form(props) {

 const { register, handleSubmit, errors } = useForm({reValidateMode: 'onChange'});

 const [startedOn, setStartedOn] = useState(false)
 const [finishedOn, setFinishedOn] = useState(false)
 const [messageOn, setMessageOn] = useState(false)

 function handleStartChange(event){
    const {name, value}=event.target
    setStartedOn(value)

 }
 function handleEndChange(event){
   const {name, value}=event.target
   setFinishedOn(value)

}

function handleMessage(event){
  const {name, value}=event.target
  setMessageOn(value)

}


 return (
   <form onSubmit={handleSubmit(({fullname, email}) => {
        props.setfullname(fullname)
        props.setemail(email)
        props.setDidSubmit(false)
        //console.log(newdate)
   })}>
    <h1_new> Contact Us </h1_new>
     <h1>Enter Your Personal Info</h1>
     <label>Full Name</label>
     <input onChange={handleStartChange} name="fullname" type="text" ref={register({ required: true, validate: value => {
           return true
     }})} />
        {errors.fullname && errors.fullname.type === "required" && <span className='error' >Field is required </span>}
    <label>Email</label>
     <input onChange={handleEndChange} name="email" type="text" ref={register({ required: true, validate: value => {
           return true
     }})} />
        {errors.email && errors.email.type === "required" && <span className='error' >Field is required </span>}
    <label>Message</label>
     <input onChange={handleMessage} name="message" type="text" ref={register({ required: true, validate: value => {
           return true
     }})} />
        {errors.message && errors.message.type === "required" && <span className='error' >Field is required </span>}
     <button className='Button'>Send</button>
   </form>
 );
}

export default Form
