import styled from "styled-components";

export const PayStyle = styled.div`
.error {
   color: red;
   font-family: sans-serif;
   font-size: 15px;
   height: 15px;
   font-style: italic;
   margin-left: 30%;
 }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}
form {
  background: rgba(0,27,45,0.8);
  border-radius: 25px;
  width: 30%;
}
h1 {
  line-height: 2;
  display: block;
  margin-bottom: 10%;
  margin-top: 10%;
  color: white;
  font-size: 23px;
  font-weight: 200;
  text-align: center;
  border-bottom: 1px solid rgb(79, 98, 148);
}
.form {
  margin-top: 60px;
}
p {
  color: #bf1650;
  margin-top: 3%;
  margin-left: 30%;
  font-size: 20px;
}
.p2 {
  color: #f1f1f1;
  margin-top: -6%;
  margin-left: 70%;
  font-size: 22px;
  margin-bottom:3%;
}
select {
  margin-left: 10%;
}
input {
  display: block;
  box-sizing: border-box;
  width: 34%;
  height: 5%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 20px 15px;
  margin-top: 10%;
  font-size: 12px;
  margin-left: 35%;
}
label {
  line-height: 2;
  text-align: left;
  display: block;
  margin-bottom: 10px;
  margin-top: 7%;
  color: white;
  font-size: 18px;
  font-weight: 200;
  text-align: center;
  border-bottom: 1px solid rgb(79, 98, 148);
}
button[type="submit"],
input[type="submit"] {
  background: rgba(44,139,201,1);
  color: white;
  text-transform: uppercase;
  border: none;
  margin-top: 25px;
  padding: 20px;
  font-size: 10px;
  font-weight: 100;
  letter-spacing: 10px;
  margin-left: 41%;
  display: inline-block;

}
button[type="submit"]:hover,
input[type="submit"]:hover {
  background: rgba(44,200,201,4)
}
button[type="submit"]:active,
input[type="button"]:active,
input[type="submit"]:active {
  transition: 0.3s all;
  transform: translateY(3px);
  border: 1px solid transparent;
  opacity: 0.8;
}
input:disabled {
  opacity: 0.4;
}
input[type="button"]:hover {
  transition: 0.3s all;
}
button[type="submit"],
input[type="button"],
input[type="submit"] {
  -webkit-appearance: none;
}
.App {
  max-width: 100%;
  height: 450px;
  margin-left: 35%;
  margin-top:-20%;
  margin-right:2%;
}
button[type="button"] {
  display: block;
  appearance: none;
  background: #333;
  color: white;
  border: none;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 4px;

}
hr {
  margin-top: 30px;
}
button {
  display: block;
  appearance: none;
  margin-top: 40px;
  border: 1px solid #333;
  margin-bottom: 20%;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 4px;
}
.speech-bubble {
	position: relative;
	background: rgba(0,27,45,0.8);
	border-radius: 5em;
  border: 2px solid transparent;
  width:20%;
  height: 20%;
  margin-top:-7%;
  margin-left: 75%;
}
.speech-bubble:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0;
	border: 25px solid transparent;
	border-top-color: rgba(0,27,45,0.8);
	border-bottom: 0;
	border-left: 0;
	margin-left: -12.5px;
	margin-bottom: -25px;
}
.speech-bubble_2 {
	position: relative;
	background: rgba(0,27,45,0.8);
	border-radius: 5em;
  border: 2px solid transparent;
  width:20%;
  height: 20%;
  margin-left: 5%;
  margin-top: 14%;
}
.speech-bubble_2:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0;
	border: 25px solid transparent;
	border-top-color: rgba(0,27,45,0.8);
	border-bottom: 0;
	border-right: 0;
	margin-left: -12.5px;
	margin-bottom: -25px;
}
`
