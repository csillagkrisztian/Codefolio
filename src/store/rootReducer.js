import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import postsReducer from "./projects/reducer";

export default combineReducers({
  appState,
  user,

  projects: postsReducer,
});
