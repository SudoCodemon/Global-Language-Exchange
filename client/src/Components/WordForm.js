import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function WordForm({ user }) {
  const [audioFile, setAudioFile] = useState("");
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [language, setLanguage] = useState("");
  const hiddenFileInput = useRef(null);
  const userId = user.id;

  function handleClick() {
    hiddenFileInput.current.click();
  }
  function handleChange(e) {
    e.preventDefault();
    setAudioFile(e.target.files[0]);
  }
  function handleSubmit(e) {
    const fd = new FormData();
    fd.append("post[voice_recording]", audioFile);
    fd.append("post[word]", word);
    fd.append("post[translation]", translation);
    fd.append("post[language]", language);
    fd.append("post[user_id]", userId);
    e.preventDefault();
    fetch("/create-word", {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  return (
    <PageDiv>
      <Title to="/">Global Language Exchange</Title>
      <FormContainer>
        <FormCard>
          <Form onSubmit={handleSubmit}>
            <FormHeader>What word are you learning?</FormHeader>
            <AudioButton onClick={handleClick}>Choose a file</AudioButton>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <Label>Write the word you're saying here*</Label>
            <Input
              type="text"
              id="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            ></Input>
            <Label>What is the intended translation?</Label>
            <Input
              type="text"
              id="translation"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
            ></Input>
            <Label>Language</Label>
            <Input
              type="text"
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            ></Input>
            <LogInSubmit type="submit">Submit</LogInSubmit>
          </Form>
        </FormCard>
      </FormContainer>
    </PageDiv>
  );
}

export default WordForm;

const PageDiv = styled.div`
  display: flex;
  background: linear-gradient(#ed4264, #ffedbc);
  height: 100vh;
  width: 100vw;
  flex-direction: column;
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

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const FormCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  height: 550px;
  width: 500px;
  border-radius: 18px;
  box-shadow: 0px 0px 6px #000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  margin-top: 20px;
  margin-bottom: 0.5em;
  color: black;
  display: block;
`;
const Input = styled.input`
  border-radius: 10px;
  height: 50px;
  width: 431px;
  font-family: "Poppins", sans-serif;
  &:focus {
    outline: none;
  }
`;

const LogInSubmit = styled.button`
  border: none;
  background: #ff535d;
  border-radius: 10px;
  height: 50px;
  width: 431px;
  color: white;
  margin-top: 20px;
  font-weight: 700;
  font-size: 15px;
`;

const FormHeader = styled.h1`
  font-size: 20px;
  font-weight: 400;
`;

const AudioButton = styled.button`
  border: none;
  border-radius: 10px;
  height: 48px;
  width: 183px;
  background: #383838;
  color: white;
  font-size: 16px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
`;
