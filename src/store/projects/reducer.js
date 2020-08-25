const initialState = {
  loading: true,
  posts: [],
  postViewed: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PROJECT": {
      return {
        ...state,
        postViewed: action.payload,
      };
    }
    case "storePosts": {
      return {
        ...state,
        loading: false,
        posts: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
}
