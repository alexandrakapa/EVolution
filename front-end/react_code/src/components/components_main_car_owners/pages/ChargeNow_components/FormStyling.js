import styled from "styled-components";

export const FormStyle = styled.div`
 padding: 120px;

 h1 {

   color: white;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
 }

 h1Top1{
  border-bottom: 1.5px solid white;
   color: white;
   font-family: sans-serif;
   font-size: 30px;
   font-weight: 600;
   line-height: 44px;
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
   border: 1px solid blue;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 100%;
   margin-bottom: 2px;

 }

 label {
   color: white;
   display: block;
   font-family: sans-serif;
   font-size: 15px;
   font-style:italic;
   font-weight: 500;
   margin-bottom: 5px;
   margin-top: 5px;
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
    background-color: rgba(44, 130, 201, 1) ;
    color: white;
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

  .Button:hover{
    background-color:rgba(44, 200, 201, 1) ;
  }




`

export const selectStyle1 = {

  control: (styles, {menuIsOpen, isFocused, isSelected}) => ({ 
     ...styles, backgroundColor: 'white', 
     '&:hover': { borderColor: 'blue' }, // border style on hover
     border: '1px solid blue', // default border color
     boxShadow: 'none', // no box-shadow
     height: '44px',
     fontSize: '15px',
   }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = 'rgba(44, 130, 201, 1)';
    return {
      ...styles,
     // height : '30px',
      fontSize : '15px',
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
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  noOptionsMessage: (base, state) => ({
        ...base,
        color: "white",
        backgroundColor: "rgba(44, 130, 201, 1)",
        fontSize : "15px",
      }),
  loadingMessage :(base, state) => ({
        ...base,
        color: "white",
        backgroundColor: "rgba(44, 130, 201, 1)",
        fontSize : "15px",
      }),
};

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',
});


export const selectStyle2 = {

  control: (styles, {menuIsOpen, isFocused, isSelected}) => ({ 
     ...styles, backgroundColor: 'white', 
     '&:hover': { borderColor: 'blue' }, // border style on hover
     border: '1px solid blue', // default border color
     boxShadow: 'none', // no box-shadow
     height: '43px',
     fontSize: '15px',
   }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = 'rgba(44, 130, 201, 1)';
    return {
      ...styles,
     // height : '30px',
      fontSize : '15px',
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
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};







