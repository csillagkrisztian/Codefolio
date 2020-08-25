export const posts = (state) => state.projects.posts;

export const selectProjectViewed = (state) => {
  console.log(state.projects);
  return state.projects.postViewed;
};
