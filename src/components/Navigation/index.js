import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logo from "../../images/CodeFoliowit.png";

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
        <div className="center">
          <img style={{ height: "50px", width: "auto" }} src={logo}></img>
        </div>
        <div className="navi">
          <NavLink exact activeClassName="active-link" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active-link" to="/post">
            New Post
          </NavLink>
          <NavLink activeClassName="active-link" to="/aboutus">
            About
          </NavLink>

          {loginLogoutControls}
        </div>
      </div>
    </div>
  );
}
