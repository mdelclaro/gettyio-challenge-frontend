import { createStore, combineReducers } from "redux";

import authReducer from "./reducers/authReducer";
import projectReducer from "./reducers/projectReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer
});

const store = createStore(rootReducer);

export default store;
