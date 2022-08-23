import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      r.json().then((user) => onLogin(user));
    });
    history.push("/");
  }
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label>Username</Label>
      <Input
        type="text"
        id="username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></Input>
      <Label>Password</Label>
      <Input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      <LogInSubmit type="submit">Log in</LogInSubmit>
    </FormContainer>
  );
}

export default LoginForm;

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
  border-color: #d6d6d6;
  border-width: 1.5px;
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
