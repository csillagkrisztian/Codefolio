
export const projects = state => state.projects.posts;
export const searchResults = state => state.projects.searchPost;

export const selectProjectViewed = (state) => {
  console.log(state.projects);
  return state.projects.postViewed;
};

export const selectProjectToBeResources = (state) =>
  state.projects.projectToBe.resources;

