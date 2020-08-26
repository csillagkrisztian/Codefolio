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
                posts: [...action.payload]
            }
        }
        case "searchedPost": {
            return {
                ...state,
                searchPost: [...action.payload]
            }
        }
        case "emptySearch": {
            return {
                ...state,
                searchPost: [],
            }
        }
        default: {
            return state
        }

    }
}


