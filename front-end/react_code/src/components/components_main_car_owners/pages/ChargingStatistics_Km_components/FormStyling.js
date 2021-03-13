import styled from "styled-components";

export const FormStyle = styled.div`
 padding: 120px;

 h1 {
   border-bottom: 1px solid white;
   color: white;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;

 }

 h1_new_charging{
   color: white;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
 }

 form {
   background: rgba(0,27,45,0.8);
   border-radius: 8px;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   margin: 0 auto;
   max-width: 500px;
   padding: 30px 50px;

 }

 input {
   border: 1px solid black;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 100%;
   margin-bottom: 4px;
 }

 label {
   color:white;
   display: block;
   font-family: sans-serif;
   font-size: 15px;
   font-style:italic;
   font-weight: 500;
   margin-bottom: 5px;
   margin-top: 5px;
 }
 label_new {
   color: white;

   font-family: sans-serif;
   font-size: 10px;
   font-style:italic;
   margin-bottom: 1px;
   margin-top: 5px;
   text-align: center;
 }

 .error {
   color: red;
   font-family: sans-serif;
   font-size: 12px;
   height: 15px;
   font-style: italic;
 }

 .submitButton {
   background-color: #6976d9;
   color: white;
   font-family: sans-serif;
   font-size: 14px;
   margin: 20px 0px;
 }

   .Button {
    background-color: #ffffff ;
    color: black;
    font-family: sans-serif;
    font-size: 14px;
    margin: 30px 60px;
    text-align: center;
    padding: 15px 32px;
    border-radius: 4px;
    outline: none;
    border: none;
    cursor: pointer;
    display: inline-block;
   }




`
