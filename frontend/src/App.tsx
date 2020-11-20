import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";

import "./App.css";
import AdminCommands from "./components/server/AdminCommands";
import ServerList from "./components/server/ServerList";
import Auth from "./components/user/Auth";
import UserList from "./components/user/UserList";
import config from "./config";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { logoutUser, isAdmin, token } = useAuthContext();

  return (
    <Router>
      <header>
        <NavLink to="/">Servers</NavLink>
        {isAdmin && <NavLink to="/users">Users</NavLink>}
        {token ? (
          <span onClick={() => logoutUser()}>Logout</span>
        ) : (
          <a href={config.discordAuthUrl}>Login</a>
        )}
      </header>
      <Switch>
        <Route exact path="/">
          {isAdmin && <AdminCommands />}
          {token ? <ServerList /> : <div>Login required</div>}
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        {isAdmin && (
          <Route exact path="/users">
            <UserList />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default App;
