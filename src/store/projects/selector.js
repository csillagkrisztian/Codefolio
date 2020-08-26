
export const posts = state => state.posts.posts;
export const searchResults = state => state.posts.searchPost;

export const selectProjectViewed = (state) => {
  console.log(state.projects);
  return state.projects.postViewed;
};


