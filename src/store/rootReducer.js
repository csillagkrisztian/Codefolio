import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import postsReducer from './posts/reducer';

export default combineReducers({
  appState,
  user,
  posts: postsReducer
});
