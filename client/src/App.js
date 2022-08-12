import { Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Homepage from "./Components/Homepage";
import Loginpage from "./Components/Loginpage";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <Loginpage />
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
