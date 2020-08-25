import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import project from "./project/reducer";
import postsReducer from './posts/reducer';

export default combineReducers({
  appState,
  user,
  project,
  posts: postsReducer
});
