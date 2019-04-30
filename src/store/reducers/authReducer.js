import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../actions/types";

const INITIAL_STATE = {
  token: null,
  refreshToken: null,
  expiryDate: null,
  userId: null,
  isAuth: false,
  authError: null
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
        ...state,
        state: INITIAL_STATE
      };
    default:
      return state;
  }
};
