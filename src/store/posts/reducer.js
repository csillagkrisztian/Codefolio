const initialState = {
    loading: true,
    posts: []
}

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case "storePosts": {
            return {
                ...state,
                loading: false,
                posts: [...action.payload]
            }
        }
        default: {
            return state
        }
    }
}