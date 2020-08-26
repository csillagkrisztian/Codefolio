<<<<<<< searching
import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { appLoading, appDoneLoading } from "../appState/actions";


function storePosts(posts) {
    return {
        type: "storePosts",
        payload: posts
    }
}

export const fetchPosts = async (dispatch, getState) => {
    try {
        const posts = await axios.get(`${apiUrl}/homepage`);
        dispatch(storePosts(posts.data));
    } catch (e) {
        console.log(e);
    }
}

export const searchPost = (post) => async (dispatch, getState) => {
    console.log("in thunkk");
    console.log(post);
    const storing = {
        type: "searchedPost",
        payload: post
    }
    dispatch(storing);
}

export const emptySearch = async (dispatch) => dispatch({ type: "emptySearch" });

export const getProject = (id) => {
  return async (dispatch, getState) => {
    // get token from the stat
    console.log("hey!");
    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/projects/${id}`);
      console.log(response.data);
      // token is still valid
      dispatch(addProject(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(appDoneLoading());
    }
  };
};

export const addProject = (data) => {
  return { type: "ADD_PROJECT", payload: data };
};

