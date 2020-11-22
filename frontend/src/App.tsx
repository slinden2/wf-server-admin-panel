import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

import AdminCommands from "./components/server/AdminCommands";
import ServerList from "./components/server/ServerList";
import Auth from "./components/user/Auth";
import UserList from "./components/user/UserList";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { isAdmin, token } = useAuthContext();

  return (
    <div className="w-screen min-h-screen flex">
      <Router>
        <div className="w-56 border bg-blue-800 text-white">
          <div className="py-3 px-5">
            <div className="text-4xl">WFAP</div>
            <small>Wreckfest Server Admin Panel</small>
          </div>
          <Navigation />
        </div>
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
    </div>
  );
};

export default App;
