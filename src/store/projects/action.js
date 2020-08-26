
import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/actions";
import { selectToken } from "../user/selectors";



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

export const addResource = (data) => {
  return { type: "ADD_RESOURCE", payload: data };
};

export const postNewProject = ({
  projectName,
  feLink,
  beLink,
  projectImg,
  ytUrl,
  projectDesc,
  resources,
  tags,
}) => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.post(
        `${apiUrl}/newproject`,
        {
          projectName,
          feLink,
          beLink,
          projectImg,
          ytUrl,
          projectDesc,
          resources,
          tags,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // token is still valid
      dispatch(setMessage("success", true, "Project successfully created!"));
      dispatch(deleteProjectToBe());
      dispatch(appDoneLoading());
      console.log(response.data);
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

const deleteProjectToBe = {
  type: "DELETE_RESOURCES",
};

