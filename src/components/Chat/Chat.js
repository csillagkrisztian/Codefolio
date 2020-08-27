import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { TextField, Button, Paper } from "@material-ui/core";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import "./Chat.css";

const socket = io.connect(apiUrl);

export default function Chat(props) {
  const user = useSelector(selectUser);
  const { chat, setChat, state, setState } = props;

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (!state) {
      return;
    }
    const { name, message } = state;
    socket.emit("message", { name: user.name, message });
    setState({ message: "", name });
  };

  useEffect(() => {
    setState({ ...state, name: user.name });
  }, []);
  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      console.log("got message!", message, name);
      setChat([...chat, { name, message }]);
    });
  });

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <p>
          {name}:<span>{message}</span>
        </p>
      </div>
    ));
  };

  return !user.token ? (
    <div>
      <p>
        <AccountCircleIcon />
        You need to be logged in to chat!
      </p>
      <Link to={"/login"}>
        <Button>Log in</Button>
      </Link>
    </div>
  ) : (
    <div className="chat">
      <h2 style={{ margin: "2rem", color: "white" }}>Welcome {user.name}!</h2>
      <Paper className="render-chat">{renderChat()}</Paper>

      <form className="chat-form" onSubmit={onMessageSubmit}>
        <Paper>
          <div style={{ margin: "2rem", padding: "1rem" }}>
            <TextField
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              lable="Message"
            />
          </div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button>Send Message</button>
          </div>
        </Paper>
      </form>
    </div>
  );
}
