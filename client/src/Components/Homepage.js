import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import img from "../Images/banner.jpg";
import WordCard from "./WordCard";
import "../index.css";

function Homepage({ user, onHandleLogOut }) {
  const [wordList, setWordList] = useState(null);
  console.log(wordList);
  const history = useHistory();
  useEffect(() => {
    fetch("/words")
      .then((res) => res.json())
      .then((data) => setWordList(data));
  }, []);

  const sortedWords =
    wordList &&
    wordList.sort(
      (a, b) => parseFloat(b.amount_likes) - parseFloat(a.amount_likes)
    );
  console.log(sortedWords);

  function handleCommentClick(e) {
    history.push("/wordpage", e);
  }
  return (
    <>
      <HeaderImg>
        <HeadingDiv>
          <Title to="/">Global Language Exchange</Title>{" "}
          {user ? (
            <WelcomeMessage>Welcome! {user && user.username}</WelcomeMessage>
          ) : null}
          {user ? (
            <LogoutBtn onClick={onHandleLogOut}> Log Out </LogoutBtn>
          ) : (
            <SignupButton to="/login">Sign up / Log in</SignupButton>
          )}
        </HeadingDiv>
        <Headerbody>
          <Headerdescription>
            Learn the right way to pronounce
          </Headerdescription>
          <Welcomeanimation className="animation"></Welcomeanimation>
        </Headerbody>
      </HeaderImg>
      <SearchDiv>
        <SearchField placeholder="Search for a word"></SearchField>
      </SearchDiv>
      <SubmitAWord>
        {user ? (
          <SubmitWordBtn to="/submit-word">Submit a word</SubmitWordBtn>
        ) : null}
      </SubmitAWord>
      <TopWordDiv>
        <TopWord>Featured Word</TopWord>
      </TopWordDiv>
      <CardContainer>
        <CardWrapper>
          <CardSection>
            <Language>{sortedWords && sortedWords[0].language}</Language>
          </CardSection>
          <CardSection>
            <Word>{sortedWords && sortedWords[0].word}</Word>
          </CardSection>
          <CardSection>
            <Translation>
              {sortedWords && sortedWords[0].translation}
            </Translation>
          </CardSection>
        </CardWrapper>
      </CardContainer>
      <CardContainer>
        <Border></Border>
      </CardContainer>
      <TopWordDiv>
        <TopWord>Word Collection</TopWord>
      </TopWordDiv>
      <CardContainer>
        {wordList &&
          wordList.map((word) => {
            return (
              <WordCard word={word} onHandleCommentClick={handleCommentClick} />
            );
          })}
      </CardContainer>
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

const WelcomeMessage = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 700;
  padding-top: 20px;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Headerdescription = styled.p`
  font-size: 56px;
  font-weight: 700;
  color: white;
  margin: 0;
  margin-top: 60px;
`;

const Welcomeanimation = styled.h1`
  color: white;
  font-size: 56px;
  bottom-margin: 20px;
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

const LogoutBtn = styled.button`
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

const SubmitAWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitWordBtn = styled(Link)`
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
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  margin-top: 50px;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 10px;
  padding-bottom: 25px;
`;

const Border = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 5px solid #adadad;
  border-width: thin;
  width 75vw;
`;

const TopWordDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopWord = styled.h1`
  font-size: 35px;
  font-weight: 700;
  padding-top: 20px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 334px;
  width: 238px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 18px;
`;
const Word = styled.h1`
  font-size: 25px;
`;

const Language = styled.h1`
  font-size: 15px;
  color: #a9a9a9;
`;

const Translation = styled.h1`
  font-size: 15px;
`;

const CardSection = styled.div`
  height: 83.5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BorderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
