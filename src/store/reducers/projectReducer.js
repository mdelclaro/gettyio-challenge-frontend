import { ADD_PROJECT, ADD_PROJECT_ERROR, SET_PROJECTS } from "../actions/types";

const INITIAL_STATE = {
  projects: null,
  projectError: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        projectError: null
      };
    case ADD_PROJECT_ERROR:
      return {
        ...state,
        projectError: action.payload.message
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    default:
      return state;
  }
};
