import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import projectReducer from "./reducers/projectReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer
});

const storeEnhancer = compose;

const store = createStore(rootReducer, storeEnhancer(applyMiddleware(thunk)));

export default store;
