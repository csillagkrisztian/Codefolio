const initialState = {
  loading: true,
  posts: [],
  postViewed: null,
  searchPost: [],
  projectToBe: { resources: [] },
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case "DELETE RESOURCES": {
      return { ...state, projectToBe: initialState.projectToBe };
    }
    case "ADD_PROJECT": {
      return {
        ...state,
        postViewed: action.payload,
      };
    }

    case "ADD_RESOURCE": {
      return {
        ...state,
        projectToBe: {
          ...state.projectToBe,
          resources: [...state.projectToBe.resources, action.payload],
        },
      };
    }

    case "storePosts": {
      return {
        ...state,
        loading: false,
        posts: [...action.payload],
      };
    }
    case "searchedPost": {
      return {
        ...state,
        searchPost: [...action.payload],
      };
    }
    case "emptySearch": {
      return {
        ...state,
        searchPost: [],
      };
    }
    case "storeComment": {
      console.log("store comment", action.payload);
      return {
        ...state,
        postViewed: {
          ...state.postViewed,
          project: {
            ...state.postViewed.project,
            comments: [...state.postViewed.project.comments, action.payload],
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}
