import { AUTH_SET_TOKEN } from "../actions/types";

const INITIAL_STATE = {
  token: null,
  refreshToken: null,
  expiryDate: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        expiryDate: action.payload.expiryDate,
        userId: action.payload.userId
      };
    default:
      return state;
  }
};
