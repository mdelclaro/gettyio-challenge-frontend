import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import projectReducer from "./reducers/projectReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer
});

const persistConfig = {
  key: "root",
  storage,
  timeout: 0
  // blacklist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
