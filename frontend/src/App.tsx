import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";

import "./App.css";
import Auth from "./components/user/Auth";
import config from "./config";
import { useMeQuery } from "./generated/apolloComponents";

const App = () => {
  const res = useMeQuery();
  console.log(res);

  return (
    <Router>
      <header>
        <NavLink to="/">Home</NavLink>
        <a href={config.discordAuthUrl}>Login</a>
      </header>
      <Switch>
        <Route exact path="/">
          Wreckfest
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
