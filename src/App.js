import React, { useEffect, useState } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MyProfilePage from "./pages/MyProfilePage/MyProfilePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import PostPage from "./pages/PostPage/PostPage";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Drawer } from "@material-ui/core";
import Chat from "./components/Chat/Chat";
import { currentMode } from "./store/appState/selectors";

function App() {
  const dispatch = useDispatch();
  const lightMode = useSelector(currentMode);
  const [open, set_open] = useState(false);
  const toggleDrawer = () => {
    set_open(!open);
  };
  const isLoading = useSelector(selectAppLoading);
  const [state, setState] = useState({ message: "", name: "", image: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div
      style={
        !lightMode
          ? { backgroundColor: `rgba(240, 248, 255, 0.527)`, color: "#171717" }
          : { backgroundColor: `rgba(33, 33, 33, 0.9)`, color: `#fff` }
      }
      className="App"
    >
      <ChatBubbleOutlineIcon
        fontSize="large"
        onClick={toggleDrawer}
        className="chat-btn"
        style={
          open
            ? { right: "350px", transition: "right .4s" }
            : { right: "25px", transition: "right .4s" }
        }
      />

      <Navigation />

      <MessageBox />
      {isLoading ? <Loading /> : null}
      <div className="app-flex">
        <div className="rendered-page">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/project/:id" component={ProjectPage} />
            <Route path="/profile/:id" component={ProfilePage} />
            <Route path="/myprofile" component={MyProfilePage} />
            <Route path="/aboutus" component={AboutPage} />
            <Route path="/post" component={PostPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>

        <div
          style={
            open
              ? { transform: `translateX(-330px)` }
              : { transform: `translateX(100px)` }
          }
          className="chat-menu"
        >
          <Chat
            state={state}
            setState={setState}
            chat={chat}
            setChat={setChat}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
