import { ADD_PROJECT, ADD_PROJECT_ERROR, SET_PROJECTS } from "../actions/types";

const INITIAL_STATE = {
  projects: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case ADD_PROJECT_ERROR:
      console.log("error adding project: " + action.payload);
      return state;
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    default:
      return state;
  }
};
