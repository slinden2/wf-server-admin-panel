import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";

import "./App.css";
import ServerList from "./components/server/ServerList";
import Auth from "./components/user/Auth";
import config from "./config";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { logoutUser } = useAuthContext();

  return (
    <Router>
      <header>
        <NavLink to="/">Home</NavLink>
        <a href={config.discordAuthUrl}>Login</a>
        <span onClick={() => logoutUser()}>Logout</span>
      </header>
      <Switch>
        <Route exact path="/">
          <ServerList />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
