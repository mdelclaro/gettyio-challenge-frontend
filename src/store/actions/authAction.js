import { AUTH_SET_TOKEN } from "./types";
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

      console.log(result);

      if (result.ok) {
        let res = await result.json();
        console.log(res);
        let { token, refreshToken, userId, expiryDate } = res;
        dispatch(authSetToken(token, refreshToken, expiryDate, userId));
      } else {
        let res = await result.json();
        console.log(res);
      }
    } catch (err) {
      console.log("Login error: " + err);
    }
  };
};

export const authSetToken = (token, refreshToken, expiryDate, userId) => {
  return {
    type: AUTH_SET_TOKEN,
    payload: {
      token,
      refreshToken,
      expiryDate,
      userId
    }
  };
};

// export const authGetToken = () => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.jwt;
//     const stateExpiryDate = getState().auth.expiryDate;
//     // verificar se token do state eh valido
//     if (!token || new Date(stateExpiryDate) <= new Date()) {
//       try {
//         const fetchedToken = await AsyncStorage.getItem("ap:auth:jwt");
//         const expiryDate = await AsyncStorage.getItem("ap:auth:expiryDate");
//         const userId = await AsyncStorage.getItem("ap:auth:userId");

//         // verificar se token do storage eh valido
//         if (!fetchedToken || new Date(expiryDate) <= new Date()) {
//           //needs to be refreshed
//           const refreshToken = await AsyncStorage.getItem(
//             "ap:auth:refreshToken"
//           );
//           const result = await timeout(
//             fetch(`${BASE_URL}auth/motoqueiro/refreshToken/`, {
//               method: "POST",
//               body: JSON.stringify({
//                 refreshToken
//               }),
//               headers: {
//                 "Content-Type": "application/json"
//               }
//             })
//           );

//           if (result.ok) {
//             let res = await result.json();
//             const { token, refreshToken, userId, expiryDate } = res;

//             dispatch(storeAuth(token, refreshToken, userId, expiryDate));
//             return token;
//           } else {
//             error = new Error("Realizar login");
//             throw Error();
//           }
//         } else {
//           dispatch(authSetToken(fetchedToken, expiryDate, userId));
//           return fetchedToken;
//         }
//       } catch (err) {
//         throw err;
//       }
//     } else {
//       return token;
//     }
//   };
// };

// export const logout = () => {
//   return {
//     type: AUTH_LOGOUT
//   };
// };
