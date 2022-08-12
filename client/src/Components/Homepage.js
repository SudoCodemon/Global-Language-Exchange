import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import img from "../Images/banner.jpg";

function Homepage() {
  return (
    <>
      <HeaderImg>
        <HeadingDiv>
          <Title to="/">Global Language Exchange</Title>{" "}
          <SignupButton to="/login">Sign up / Log in</SignupButton>
        </HeadingDiv>
        <Headerbody>
          <Headerdescription>
            Learn the right way to pronounce.
          </Headerdescription>
        </Headerbody>
      </HeaderImg>
      <SearchDiv>
        <SearchField placeholder="Search for a word"></SearchField>
      </SearchDiv>
    </>
  );
}

export default Homepage;

const HeaderImg = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 50vh;
`;

const HeadingDiv = styled.div`
  margin-top: 0px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled(Link)`
  color: white;
  margin-top: 0px;
  padding-top: 20px;
  padding-left: 5%;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
`;

const SignupButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: #ff6a73;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  height: 48px;
  width: 197px;
  color: white;
  margin-top: 30px;
  margin-right: 147px;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
`;

const Headerbody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Headerdescription = styled.p`
  font-size: 56px;
  font-weight: 700;
  color: white;
`;

const SearchField = styled.input`
  border-radius: 50px;
  font-size: 16px;
  border: 0.5px solid #d6d6d6;
  box-shadow: 0px 8px 10px 0px #0000000d;
  height: 72px;
  width: 702px;
  position: absolute;
  &:focus {
    outline: none;
  }
  padding-left: 15px;
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
