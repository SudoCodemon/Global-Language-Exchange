import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Homepage from "./Components/Homepage";
import Loginpage from "./Components/Loginpage";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/me").then((r) => {
      r.json().then((user) => setUser(user));
    });
  }, []);

  function handleLogOut() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Homepage
            user={user}
            onHandleLogOut={handleLogOut}
            setUser={setUser}
          />
        </Route>
        <Route exact path="/login">
          <Loginpage onLogin={setUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
body{
  font-family: 'Poppins', sans-serif;
}
`;
