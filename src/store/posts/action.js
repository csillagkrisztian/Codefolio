import { apiUrl } from '../../config/constants';
import axios from 'axios';

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