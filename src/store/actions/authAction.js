import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS
} from "./types";
import { dev_url } from "../../config/config";

import timeout from "../../utils/timeout";

export const signIn = ({ email, password }) => {
  return async dispatch => {
    try {
      const result = await timeout(
        fetch(`${dev_url}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        dispatch(loginSuccess(res));
      } else {
        let res = await result.json();
        dispatch(loginError(res));
      }
    } catch (err) {
      dispatch(loginError(err));
    }
  };
};

export const loginSuccess = data => {
  const { token, refreshToken, userId, expiryDate, initials } = data;
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      refreshToken,
      expiryDate,
      userId,
      initials
    }
  };
};

export const loginError = err => {
  return {
    type: LOGIN_ERROR,
    payload: err
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const signUp = data => {
  return async dispatch => {
    const { email, password, firstName, lastName } = data;
    try {
      const result = await timeout(
        fetch(`${dev_url}/signup`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
      );

      if (result.ok) {
        dispatch(signupSuccess());
      } else {
        let res = await result.json();
        dispatch(signupError(res));
      }
    } catch (err) {
      dispatch(signupError(err));
    }
  };
};

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS
  };
};

export const signupError = err => {
  return {
    type: SIGNUP_ERROR,
    payload: err
  };
};
