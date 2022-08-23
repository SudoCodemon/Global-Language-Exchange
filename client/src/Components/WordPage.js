import React, { useRef, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { BsFillPlayFill, BsPauseFill, BsHeart, BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

function WordPage({ user }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const audioElem = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const location = useLocation();
  const word = location.state;
  const [newObj, setNewObj] = useState({
    comment: "",
    user_id: user.id,
    word_id: word.id,
  });
  const [newLikeObj, setNewLikeObj] = useState({
    user_id: user.id,
    word_id: word.id,
  });
  const [updatedComment, setUpdatedComment] = useState({
    comment: "",
    user_id: user.id,
    word_id: word.id,
  });
  console.log(showForm);

  useEffect(() => {
    fetch(`/words/${word.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentWord(data);
      });
  }, []);

  function handleLikeClick() {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLikeObj),
    }).then(() => {
      fetch(`/words/${word.id}`)
        .then((res) => res.json())
        .then(setCurrentWord);
    });
  }

  function handleClick() {
    setIsPlaying(!isPlaying);
  }

  function handleChange(e) {
    setNewObj({ ...newObj, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    }).then(() => {
      fetch(`/words/${word.id}`)
        .then((res) => res.json())
        .then(setCurrentWord);
    });
  }

  function handleDelete(commentId) {
    fetch(`/comments/${commentId}`, {
      method: "DELETE",
    }).then(() => {
      fetch(`/words/${word.id}`)
        .then((res) => res.json())
        .then(setCurrentWord);
    });
  }

  function handleEditClick(comment) {
    setShowForm(!showForm);
    if (showForm == true) {
      setSelectedComment({});
    } else if (showForm == false) {
      setSelectedComment(comment);
    }
  }

  function handleEditForm(e) {
    e.preventDefault();
    fetch(`/comments/${selectedComment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedComment),
    })
      .then(() => {
        fetch(`/words/${word.id}`)
          .then((res) => res.json())
          .then(setCurrentWord);
      })
      .then(setShowForm(!showForm));
  }

  function handleEditChange(e) {
    setUpdatedComment({ ...updatedComment, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying]);
  return (
    <PageDiv>
      <Title to="/">Global Language Exchange</Title>
      <FormContainer>
        <WordCardForm>
          <LikeButtonDiv>
            <LikeButton onClick={handleLikeClick}>
              <BsHeart size={20} /> {currentWord && currentWord.amount_likes}
            </LikeButton>
          </LikeButtonDiv>
          <HeaderSection>
            <Language>{currentWord && currentWord.language}</Language>
          </HeaderSection>
          <SecondHeaderSection>
            <SubmittedBy>
              Submitted by{" "}
              <UserName>{currentWord && currentWord.user.username}</UserName>
            </SubmittedBy>
          </SecondHeaderSection>
          <WordSection>
            <Word>{currentWord && currentWord.word}</Word>
            <audio src={currentWord && currentWord.voice_url} ref={audioElem} />
            <PlayButton onClick={handleClick}>
              {isPlaying ? (
                <BsPauseFill size={50} />
              ) : (
                <BsFillPlayFill size={50} />
              )}
            </PlayButton>
            <Translation>{currentWord && currentWord.translation}</Translation>
          </WordSection>
        </WordCardForm>
        <CommentFormCard>
          {!showForm ? (
            <AddAComment>Add a Comment</AddAComment>
          ) : (
            <AddAComment>Edit a Comment</AddAComment>
          )}
          {!showForm ? (
            <CommentForm onSubmit={handleSubmit}>
              <Input type="text" name="comment" onChange={handleChange}></Input>
              <SubmitButton type="submit">Submit</SubmitButton>
            </CommentForm>
          ) : (
            <CommentForm onSubmit={handleEditForm}>
              <Input
                type="text"
                name="comment"
                onChange={handleEditChange}
              ></Input>
              <SubmitButton type="submit">Submit</SubmitButton>
            </CommentForm>
          )}
          <CommentContainer>
            {currentWord &&
              currentWord.comments.map((comment) => {
                return (
                  <CommentDiv>
                    <BorderDiv>
                      <Border></Border>
                    </BorderDiv>

                    <OneComment>
                      <UsernameDiv>
                        <CommentUser>{comment.user.username}</CommentUser>
                        {comment.user.id == user.id ? (
                          <Icondiv>
                            <EditDelete
                              onClick={() => handleEditClick(comment)}
                            >
                              <BiEditAlt size={15} />
                            </EditDelete>{" "}
                            <EditDelete
                              onClick={() => handleDelete(comment.id)}
                            >
                              <BsTrash size={15} />
                            </EditDelete>
                          </Icondiv>
                        ) : null}
                      </UsernameDiv>
                      <Comment>{comment.comment}</Comment>
                    </OneComment>
                  </CommentDiv>
                );
              })}
          </CommentContainer>
        </CommentFormCard>
      </FormContainer>
    </PageDiv>
  );
}

export default WordPage;

const PageDiv = styled.div`
  display: flex;
  background: linear-gradient(#ee9ca7, #ffdde1);
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

const WordCardForm = styled.div`
  height: 428px;
  width: 531px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
`;

const Language = styled.h1`
  font-size: 20px;
  font-weight: 300;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const SecondHeaderSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Word = styled.h1`
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 0px;
`;

const Translation = styled.h1`
  font-size: 20px;
  font-weight: 400;
`;

const PlayButton = styled.button`
  border: none;
  background: white;
  display: flex;
  postion: relative;
`;

const WordSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SubmittedBy = styled.h1`
  font-size: 16px;
  font-weight: 300;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const UserName = styled.span`
  color: #ff535d;
`;

const LikeButton = styled.button`
  border: none;
  background: white;
  padding-top: 10px;
  padding-left: 10px;
`;

const LikeButtonDiv = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const CommentFormCard = styled.div`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: white;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  width: 531px;
  margin-top: 20px;
`;

const CommentForm = styled.form`
  display: flex;
  justify-content: space-evenly;
`;

const Input = styled.input`
  height: 48px;
  width: 373px;
  border-radius: 10px;
  border-color: #d6d6d6;
  border-width: thin;
  font-family: "Poppins", sans-serif;
  &:focus {
    outline: none;
  }
`;
const SubmitButton = styled.button`
  height: 48px;
  width: 98px;
  border: none;
  background: #ff535d;
  color: white;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
`;

const AddAComment = styled.h1`
  font-size: 16px;
  color: #a1a1a1;
  font-weight: 300;
  padding-left: 20px;
  margin-bottom: 2px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Border = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 5px solid #adadad;
  border-width: thin;
  width: 400px;
`;

const OneComment = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  align-items: left;
`;

const CommentUser = styled.h1`
  display: flex;
  font-size: 16px;
  font-weight: 700;
  padding-left: 20px;
  margin-bottom: 0px;
  justify-content: space-between;
`;

const Comment = styled.h1`
  font-size: 16px;
  font-weight: 400;
  padding-left: 20px;
  margin-bottom: 10px;
  margin-top: 0px;
`;

const CommentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const BorderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
`;

const UsernameDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Icondiv = styled.div`
  display: flex;
  padding-top: 12px;
  padding-right: 20px;
  justify-content: space-between;
  width: 40px;
`;

const EditDelete = styled.button`
  background: none;
  color: none;
  border: none;
`;
