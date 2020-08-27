import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { TextField, Button } from "@material-ui/core";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import './Chat.css';

const socket = io.connect(apiUrl);

export default function Chat() {
  const user = useSelector(selectUser);
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

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
  console.log(chat);

  return (
    <div className="chat">
      <h1>Chat</h1>

      <div>
        <h1>Chat log</h1>
        {renderChat()}
      </div>
      <form className="chat-form" onSubmit={onMessageSubmit}>
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
