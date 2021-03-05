import styled from "styled-components";

export const FormStyle = styled.div`
 padding: 20px;

 h1 {
  border-bottom: 1px solid white;
  color: #1c1c1c;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  padding: 10px;
  text-align: center;
}

form {
 background: rgba(200, 247, 197, 0.62);
  border: 1px solid #dedede;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 500px;
  padding: 30px 50px;
}

 input {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 100%;
   margin-bottom: 2px;
 }

 label {
  color: #1a1a1a;
  display: block;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  margin-top: 5px
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
  background-color: #006400;
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  margin: 20px 25%;
  width: 200px;
  height: 30px

 }



`
