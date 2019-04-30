import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "./types";
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
        console.log(res);
        let { token, refreshToken, userId, expiryDate } = res;
        dispatch(loginSuccess(token, refreshToken, expiryDate, userId));
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(loginError(res));
      }
    } catch (err) {
      console.log("Login error: " + err);
      dispatch(loginError(err));
    }
  };
};

export const loginSuccess = (token, refreshToken, expiryDate, userId) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      refreshToken,
      expiryDate,
      userId
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
        fetch(`${dev_url}/auth/signup`, {
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
        let res = await result.json();
        console.log(res);
        let { token, refreshToken, userId, expiryDate } = res;
        dispatch(loginSuccess(token, refreshToken, expiryDate, userId));
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(loginError(res));
      }
    } catch (err) {
      console.log("Login error: " + err);
      dispatch(loginError(err));
    }
  };
};
