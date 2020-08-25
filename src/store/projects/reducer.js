const initialState = {
  loading: true,
  posts: [],
  postViewed: null,
  projectToBe: { resources: [] },
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
}
