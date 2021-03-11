import styled from "styled-components";

export const ProfStyle = styled.div`
* {
  box-sizing: border-box;
}
body {
  font-family: sans-serif;

}


/* Float four columns side by side */
.column {
  float: left;
  width: 38%;
  margin-left: 8%;
}
.column_2 {
  float: left;
  width: 38%;
  margin-left: 30%;
}
/* Remove extra left and right margins, due to padding */
.row {
  margin-top:5%;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
/* Responsive columns */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}
/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 forestgreen;
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
  border-radius: 50px;
}
.header {
  padding: 60px;
  text-align: center;
  background: forestgreen;
  color: white;
  font-size: 30px;
}
.ribbon {
 font-size: 40px !important;
 /* This ribbon is based on a 16px font side and a 24px vertical rhythm. I've used em's to position each element for scalability. If you want to use a different font size you may have to play with the position of the ribbon elements */
 width: fit-content;
 position: relative;
 background: forestgreen;
 color: #fff;
 text-align: center;
 padding: 1em 2em; /* Adjust to suit */
 margin: 1em auto 3em; /* Based on 24px vertical rhythm. 48px bottom margin - normally 24 but the ribbon 'graphics' take up 24px themselves so we double it. */
}
.ribbon:before, .ribbon:after {
 content: "";
 position: absolute;
 display: block;
 bottom: -1em;
 border: 1.5em solid #A6826C;
 z-index: -1;
}
.ribbon:before {
 left: -2em;
 border-right-width: 1.5em;
 border-left-color: transparent;
 z-index:-1;
}
.ribbon:after {
 right: -2em;
 border-left-width: 1.5em;
 border-right-color: transparent;
 z-index: -1;
}
.ribbon .ribbon-content:before, .ribbon .ribbon-content:after {
 content: "";
 position: absolute;
 display: block;
 border-style: solid;
 border-color: black transparent transparent transparent;
 bottom: -1em;
 z-index: -1;
}
.ribbon .ribbon-content:before {
 left: 0;
 border-width: 1em 0 0 1em;
 z-index:-1;
}
.ribbon .ribbon-content:after {
 right: 0;
 border-width: 1em 1em 0 0;
 z-index: -1;
}

 h2 {
   color: #3d3d3d;
   font-family: sans-serif;
   font-size: 30px;
   border-bottom: 1px solid forestgreen;
   line-height: 24px;
   padding: 10px;
   text-align: center;
   top: 60px;
 }
 p {
   color: #3d3d3d;
   font-family: sans-serif;
   font-size: 25px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
   top: 60px;
 }
 li {
   color: #3d3d3d;
   font-family: sans-serif;
   font-size: 30px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
   margin-top: 10%;
   margin-left: 10%;
 }
 .input_text {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 20%;
   top: 50%;
   margin-top:60px;
   margin-left: 38%;
   margin-bottom: 10px;
 }
 .Button {
  background-color: darkseagreen;
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  margin: 5px 43%;
  width: 100px;
  height: 30px
 }
 .input_radio_1 {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 2px;
   top: 50%;
   margin-top:40px;
   margin-left: 450px;
   margin-bottom: 40px;
 }
 .input_radio_2 {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 2px;
   top: 50%;
   margin-top:40px;
   margin-left: 150px;
   margin-bottom: 40px;
 }
`
