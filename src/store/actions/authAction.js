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
  localStorage.setItem("auth:token", token);
  localStorage.setItem("auth:expiryDate", expiryDate);
  localStorage.setItem("auth:refreshToken", refreshToken);
  localStorage.setItem("auth:userId", userId);
  localStorage.setItem("auth:initials", initials);
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
  localStorage.removeItem("auth:token");
  localStorage.removeItem("auth:expiryDate");
  localStorage.removeItem("auth:refreshToken");
  localStorage.removeItem("auth:userId");
  localStorage.removeItem("auth:initials");
  localStorage.removeItem("persist:root");
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

export const retrieveToken = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const stateExpiryDate = getState().auth.expiryDate;

    if (!token || new Date(stateExpiryDate) <= new Date()) {
      try {
        const fetchedToken = await localStorage.getItem("auth:token");
        const expiryDate = await localStorage.getItem("auth:expiryDate");
        const refreshToken = await localStorage.getItem("auth:refreshToken");

        if (!fetchedToken || new Date(expiryDate) <= new Date()) {
          if (refreshToken) {
            const result = await timeout(
              fetch(`${dev_url}/auth/refreshToken/`, {
                method: "POST",
                body: JSON.stringify({
                  token: fetchedToken,
                  refreshToken
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              })
            );

            if (result.ok) {
              let res = await result.json();
              console.log(res);
              dispatch(loginSuccess(res));
              return res.token;
            } else {
              let res = await result.json();
              dispatch(loginError(res));
            }
          }
        } else {
          return fetchedToken;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return token;
    }
  };
};
