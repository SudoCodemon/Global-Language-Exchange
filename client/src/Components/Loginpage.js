import { Link } from "react-router-dom";
import styled from "styled-components";

function Loginpage() {
  return (
    <PageContainer>
      <LeftSide>
        <Title to="/">Global Language Exchange</Title>
        <LeftTextBox>
          <LeftTitle>Learn from Native Speakers</LeftTitle>
          <LeftDescription>
            Enhance your language learning experience by recieving insightful
            feedback on pronunciation, grammar, and vocabulary from a global
            community of natural speakers.
          </LeftDescription>
        </LeftTextBox>
      </LeftSide>
      <RightSide>
        <ButtonContainer>
          <LoginBtn>Log in</LoginBtn>
          <Pipe>|</Pipe>
          <SignUpBtn>Sign up</SignUpBtn>
        </ButtonContainer>
      </RightSide>
    </PageContainer>
  );
}

export default Loginpage;

const PageContainer = styled.div`
  display: flex;
`;

const LeftSide = styled.div`
  flex: 1;
  background: radial-gradient(#ff535d, #f45c43);
  height: 100vh;
  weidth: 100vw;
`;

const RightSide = styled.div`
  flex: 1;
  height: 100vh;
  width: 100vw;
`;

const Title = styled(Link)`
  display: flex;
  color: white;
  margin-top: 0px;
  padding-top: 30px;
  padding-left: 5%;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
`;

const LoginBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 16px;
  color: #adadad;
  &:hover {
    color: #f45c43;
  }
  font-family: "Poppins", sans-serif;
`;

const SignUpBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 16px;
  color: #adadad;
  &:hover {
    color: #f45c43;
  }
  font-family: "Poppins", sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 30px;
  margin-right: 147px;
`;

const Pipe = styled.p`
  color: #adadad;
`;

const LeftTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeftTitle = styled.h1`
  display: flex;
  order: 2;
  color: white;
  font-size: 40px;
  font-weight: 700;
  padding-top: 27%;
  margin-bottom: 10px;
`;

const LeftDescription = styled.p`
  display: flex;
  order: 2;
  color: white;
  font-size: 18px;
  font-weight: 400;
  padding: 0% 20% 0% 20%;
`;
