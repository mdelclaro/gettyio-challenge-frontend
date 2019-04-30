import { ADD_PROJECT } from "../actions/types";

const INITIAL_STATE = {
  projects: [
    { id: "1", title: "title 1", content: "content 1" },
    { id: "2", title: "title 2", content: "content 2" },
    { id: "3", title: "title 3", content: "content 3" }
  ]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    default:
      return state;
  }
};
