import { ADD_PROJECT } from "./types";

export const createProject = project => {
  return dispatch => {
    dispatch(addProject(project));
  };
};

export const addProject = project => {
  return {
    type: ADD_PROJECT,
    payload: project
  };
};
