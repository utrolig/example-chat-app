import React from "react";
import GlobalStyle from "./styles/GlobalStyles";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Chat from "./components/Chat";
import friends from "./data/friends";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/friends/:friendId" component={Chat} />
        <Redirect to={`/friends/${friends[0].id}`} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
