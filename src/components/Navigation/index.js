import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <div>
      <div className="navigating-bar">
        <div></div>
        <div className="navi">
          <NavLink exact activeClassName="active-link" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active-link" to="/aboutus">
            About
          </NavLink>
          <NavLink activeClassName="active-link" to="/post">
            Create a New Project
          </NavLink>
        </div>
        {loginLogoutControls}
      </div>
      <div className="logo-bar">
        <h1>Codefolio!</h1>
      </div>
    </div>
  );
}
