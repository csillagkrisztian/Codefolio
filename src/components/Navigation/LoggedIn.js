import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import { Button } from "@material-ui/core";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Link to={`/myprofile`}>
        {" "}
        <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.email}</Nav.Item>
      </Link>
      <Button color="inherit" onClick={() => dispatch(logOut())}>
        Logout
      </Button>
    </>
  );
}
