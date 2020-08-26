import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const socket = io.connect(apiUrl);

export default function Chat(props) {
  const user = useSelector(selectUser);
  const { chat, setChat, state, setState } = props;

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
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
        <h3>
          {name}:<span>{message}</span>
        </h3>
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
      <form onSubmit={onMessageSubmit}>
        <h2 style={{ margin: "2rem" }}>Welcome to the chat {user.name}!</h2>
        <div style={{ width: "auto" }}>{renderChat()}</div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            lable="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
    </div>
  );
}
