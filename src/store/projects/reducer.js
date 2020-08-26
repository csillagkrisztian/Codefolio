const initialState = {

    loading: true,
    posts: [],
    searchPost: [],
    postViewed: null,
}

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


