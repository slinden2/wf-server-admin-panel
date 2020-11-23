import React from "react";
import { NavLink } from "react-router-dom";
import config from "../config";
import { useAuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { logoutUser, isAdmin, token } = useAuthContext();
  const liStyles = "w-full text-xl cursor-pointer";
  const linkStyles = "inline-block w-full px-4 py-2";
  const activeNavlink = "bg-blue-900";

  return (
    <nav>
      <ul className="my-3">
        <li className={liStyles}>
          <NavLink
            exact
            to="/"
            className={linkStyles}
            activeClassName={activeNavlink}
          >
            Servers
          </NavLink>
        </li>
        {isAdmin && (
          <li className={liStyles}>
            <NavLink
              to="/users"
              className={linkStyles}
              activeClassName={activeNavlink}
            >
              Users
            </NavLink>
          </li>
        )}
        <li className={liStyles}>
          {token ? (
            <span className={linkStyles} onClick={() => logoutUser()}>
              Logout
            </span>
          ) : (
            <a className={linkStyles} href={config.discordAuthUrl}>
              Login
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
