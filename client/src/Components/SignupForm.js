import { useState } from "react";
import styled from "styled-components";

function SignupForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleNewMember(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => onLogin(user));
        }
      })
      .then(setUsername(""), setPassword(""), setPasswordConfirmation(""));
  }
  return (
    <FormContainer onSubmit={handleNewMember}>
      <NewMember>Are you new here?</NewMember>
      <Label>Username</Label>
      <Input
        placeholder="Must be at least 3 characters long"
        type="text"
        id="username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></Input>
      <Label>Password</Label>
      <Input
        placeholder="Must be 6-8 characters long"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      ></Input>
      <Label>Confirm Password</Label>
      <Input
        placeholder="Must be 6-8 characters long"
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      ></Input>
      <LogInSubmit type="submit">Complete Registration</LogInSubmit>
    </FormContainer>
  );
}

export default SignupForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20%;
`;

const Label = styled.label`
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
  margin-top: 10px;
  color: white;
  font-weight: 700;
  font-size: 15px;
`;

const NewMember = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;
