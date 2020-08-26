const initialState = {

  loading: true,
  posts: [],
  postViewed: null,
  searchPost: [],
  projectToBe: { resources: [] },
};

export default function postsReducer(state = initialState, action) {
<<<<<<< HEAD
    switch (action.type) {
        case "ADD_PROJECT": {
            return {
                ...state,
                postViewed: action.payload,
            };
        }
=======
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
    

>>>>>>> 3e6d9866f05488cf5870f3ecded45bd3a155257c
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


