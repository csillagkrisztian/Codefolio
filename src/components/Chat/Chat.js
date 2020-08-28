import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { TextField, Button, Paper } from "@material-ui/core";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import "./Chat.css";
import logo from "../../images/codefolio_chat_wit.png";
import reactEmoji from "react-emoji";

const socket = io.connect(apiUrl);

export default function Chat(props) {
  const user = useSelector(selectUser);
  const { chat, setChat, state, setState } = props;

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (!state || !state.message) {
      return;
    }
    const { name, message, image } = state;
    socket.emit("message", { name: user.name, message, image: user.userImg });
    setState({ message: "", name, image });
  };

  useEffect(() => {
    setState({ ...state, name: user.name });
  }, []);
  useEffect(() => {
    socket.on("message", ({ name, message, image }) => {
      console.log("got message!", message, name, image);
      setChat([...chat, { name, message, image }]);
    });
  });

  const renderChat = () => {
    return chat.map(({ name, message, image }, index) => (
      <div key={index}>
        <div className="chat-popup">
          <img
            style={{
              padding: "2px",
              marginBottom: "0px",
              display: "block",
              width: "36px",
              height: "36px",
              overflow: "hidden",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={image}
          ></img>
          <span style={{ color: "blue" }}>{name}</span> :
          <span>{reactEmoji.emojify(message)}</span>
        </div>
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
      <img
        src={logo}
        style={{
          display: "block",
          width: "208px",
          height: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          color: "white",
        }}
      />
      <ScrollToBottom>
        <div className="render-chat">{renderChat()}</div>
      </ScrollToBottom>

      <form className="chat-form" onSubmit={onMessageSubmit}>
        <div style={{ margin: "5px", marginLeft: "12px", padding: "1rem" }}>
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
      </form>
    </div>
  );
}
