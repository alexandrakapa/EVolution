import styled from "styled-components";

export const PayStyle = styled.div`
.error {
   color: red;
   font-family: sans-serif;
   font-size: 15px;
   height: 15px;
   font-style: italic;
   margin-left: 27%;
 }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

.p2 {
  color: #f1f1f1;
  margin-top: -5%;
  margin-left: 72%;
  font-size: 20px;
}

form {
  margin-top: 5%;
  background: rgba(0,27,45,0.8);
  border-radius: 25px;
  width: 29%;
}

h1 {
  font-weight: 100;
  font-size: 30px;
  color: white;
  text-align: center;
  padding-top: 14%;
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


.selectStyle {
  margin-left: 30%;
  margin-top: 3%;
  width: 40%;
  padding: 10px 15px;
  font-size: 23px;
}

input {
  display: block;
  box-sizing: border-box;
  width: 40%;
  height: 6%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  margin-top: 2%;
  font-size: 18px;
  margin-left: 30%;
}

label {
  line-height: 2;
  text-align: left;
  display: block;
  margin-top: 2%;
  color: white;
  font-size: 17px;
  font-weight: 200;
  text-align: center;

}

.label2 {
  line-height: 2;
  text-align: left;
  display: block;
  margin-top: 5%;
  color: white;
  font-size: 25px;
  font-weight: 200;
  text-align: center;
  border-bottom: 1px solid rgb(79, 98, 148);
}

.label3 {
  line-height: 2;
  text-align: left;
  display: block;
  margin-top: -1%;
  margin-bottom: 3%;
  color: white;
  font-size: 17px;
  font-weight: 200;
  text-align: center;
}

button[type="submit"],
input[type="submit"] {
  background: rgba(44,139,201,1);
  color: white;
  text-transform: uppercase;
  border: none;
  padding: 20px;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 10px;
  margin-left: 29%;
  margin-top: 7%;
}

button[type="submit"]:hover,
input[type="submit"]:hover {
  background: rgba(44,200,201,4);
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
  height: 50%;
  margin-left: 35%;
  margin-top:-25%;
  margin-right:5%;

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
  margin-top: 40%;
  border: 1px solid #333;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 4px;
}



.expYear {
  display: block;
  box-sizing: border-box;
  width: 12%;
  height: 6%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  margin-top: -8%;
  font-size: 18px;
  margin-left: 30%;
  margin-bottom: 2%;
}

.CVV {
  display: block;
  box-sizing: border-box;
  width: 12%;
  height: 6%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  margin-top: 10%;
  font-size: 18px;
  margin-left: 58%;
  margin-right: 23%;
  margin-bottom: 2%;
}

.expYearLabel {
  line-height: 2;
  text-align: left;
  display: block;
  margin-top: 3%;
  color: white;
  font-size: 18px;
  font-weight: 200;
  margin-left: 30%;
  float:left;
}

.CVVLabel {
  line-height: 2;
  text-align: left;
  display: block;
  margin-top: 3%;
  color: white;
  font-size: 18px;
  font-weight: 200;
  margin-right: 37%;
  float:right;
}
.speech-bubble {
	position: relative;
	background: rgba(0,27,45,0.8);
	border-radius: 5em;
  border: 2px solid transparent;
  width:20%;
  height: 200px;
  margin-left: 70%;
  margin:right: 50%;
  margin-top:17%;
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

`
export const selectStyle2 = {

  control: (styles, {menuIsOpen, isFocused, isSelected}) => ({
     ...styles, backgroundColor: 'white',
     '&:hover': { borderColor: 'blue' }, // border style on hover
     border: '1px solid blue', // default border color
     marginLeft : '26%',
     marginTop : '3%',
     boxShadow: 'none', // no box-shadow
     width: '48%',
     height: '52px',
     fontSize: '18px',
   }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = 'rgba(44, 130, 201, 1)';
    return {
      ...styles,
     // height : '30px',
      fontSize : '18px',
      backgroundColor:
         isSelected
        ? data.color
        : isFocused
        ? color
        : null,
      color:
        isSelected
        ? 'rgba(44, 130, 201, 1)'
        :
        isFocused
        ? 'white'
        : 'black',

      cursor: isSelected ? 'not-allowed' : 'default',


      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : 'green'),
      },
    };
  },

};
