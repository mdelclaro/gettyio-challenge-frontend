import {
  ADD_PROJECT,
  ADD_PROJECT_ERROR,
  SET_PROJECTS,
  EDIT_PROJECT,
  EDIT_PROJECT_ERROR,
  REMOVE_PROJECT,
  REMOVE_PROJECT_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  projects: [],
  projectsError: null
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
        projectsError: action.payload.message
      };
    case EDIT_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project, i) =>
          project[i]._id === action.payload._id
            ? {
                ...project,
                title: action.payload.title,
                content: action.payload.content
              }
            : project
        )
      };
    case EDIT_PROJECT_ERROR:
      return {
        ...state,
        projectsError: action.payload.message
      };
    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project, i) => project[i]._id !== action.payload._id
        )
      };
    case REMOVE_PROJECT_ERROR:
      return {
        ...state,
        projectsError: action.payload.message
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
