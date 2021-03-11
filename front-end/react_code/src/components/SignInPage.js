import React, { Component } from 'react';
import SignIn from './SignIn'
import styled from "styled-components";
import { motion } from "framer-motion";
import './App.css';
import NavbarHome from './NavbarHome';
import "./Body.css"


const AppContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const BoxContainer = styled.div`
  width: 280px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;


const BackDrop = styled(motion.div)`
  width: 160%;
  height: 110%;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(5,94,8);
background: linear-gradient(90deg, rgba(5,94,8,1) 0%, rgba(101,184,39,1) 55%, rgba(182,244,37,1) 100%);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 0%;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

// const backdropVariants = {
//   expanded: {
//     width: "233%",
//     height: "1050px",
//     borderRadius: "20%",
//     transform: "rotate(60deg)",
//   },
//   collapsed: {
//     width: "160%",
//     height: "550px",
//     borderRadius: "50%",
//     transform: "rotate(60deg)",
//   },
// };

//import Cookies from 'universal-cookie';
//import * as ROUTES from '../../constants/routes';
//const cookies = new Cookies();
//const ->unchanged
function SignInPage(props){
  console.log("hi");
  console.log(props.setUserData);
  console.log("hi");
  return (
  <div>
  <NavbarHome />
  <div >
  <AppContainer  style= {{ marginTop:'10vh'}} >
    <BoxContainer>
      <TopContainer>
        <BackDrop/>
        <HeaderContainer >
            <HeaderText  >Welcome</HeaderText>
            <HeaderText  ><br /> </HeaderText>
            <SmallText>Please sign-in to continue!</SmallText>
        </HeaderContainer>
      </TopContainer>


    <InnerContainer>
      <SignIn setUserData={props.setUserData} />
    </InnerContainer>

  < /BoxContainer>
  </AppContainer>
</div>
  </div>
)
};

export default SignInPage;
