import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  token: null,
  refreshToken: null,
  expiryDate: null,
  userId: null,
  isAuth: false,
  authError: null,
  initials: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        expiryDate: action.payload.expiryDate,
        userId: action.payload.userId,
        initials: action.payload.initials,
        isAuth: true,
        authError: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authError: "Login failed: " + action.payload.message
      };
    case LOGOUT:
      return {
        state: INITIAL_STATE
      };
    case SIGNUP_SUCCESS:
      console.log("Signup success");
      return {
        ...state,
        isAuth: true,
        authError: null
      };
    case SIGNUP_ERROR:
      console.log("Signup error");
      return {
        ...state,
        authError: action.payload.message
      };
    default:
      return state;
  }
};
