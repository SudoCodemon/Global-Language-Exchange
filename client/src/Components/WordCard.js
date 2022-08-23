import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function WordCard({ word, onHandleCommentClick }) {
  const audioElem = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  function handleClick() {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying]);

  function handleComClick() {
    onHandleCommentClick(word);
  }

  return (
    <CardWrapper>
      <CardSection>
        <Language>{word.language}</Language>
      </CardSection>
      <CardSection>
        <Word>{word.word}</Word>
      </CardSection>
      <CardSection>
        <Translation>{word.translation}</Translation>
      </CardSection>
      <CardSection>
        <audio src={word.voice_url} ref={audioElem} />
        <PlayButton onClick={handleClick}>
          {isPlaying ? <BsPauseFill size={50} /> : <BsFillPlayFill size={50} />}
        </PlayButton>
      </CardSection>
      <CardSection>
        <WordButton onClick={handleComClick}>Comment</WordButton>
      </CardSection>
    </CardWrapper>
  );
}

export default WordCard;

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

const PlayButton = styled.button`
  border: none;
  background: white;
`;

const CardSection = styled.div`
  height: 83.5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WordButton = styled.button`
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
`;
