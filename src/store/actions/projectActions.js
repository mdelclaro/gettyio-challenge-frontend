import { ADD_PROJECT, ADD_PROJECT_ERROR, SET_PROJECTS } from "./types";
import { retrieveToken } from "./authAction";
import { dev_url } from "../../config/config";

import timeout from "../../utils/timeout";

export const getProjects = () => {
  return async dispatch => {
    try {
      const token = await dispatch(retrieveToken());
      const result = await timeout(
        fetch(`${dev_url}/projects`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        dispatch(setProjects(res));
      } else {
        let res = await result.json();
        console.log(res);
      }
    } catch (err) {
      console.log("Get projects error: " + err);
    }
  };
};

export const setProjects = projects => {
  return {
    type: SET_PROJECTS,
    payload: projects
  };
};

export const getProject = id => {
  return async dispatch => {
    try {
      const token = await dispatch(retrieveToken());
      const result = await timeout(
        fetch(`${dev_url}/projects/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        return res;
      } else {
        let res = await result.json();
        console.log(res);
        return false;
      }
    } catch (err) {
      console.log("Create project error: " + err);
      return false;
    }
  };
};

export const createProject = ({ title, content, userId }) => {
  return async dispatch => {
    try {
      const token = await dispatch(retrieveToken());
      const result = await timeout(
        fetch(`${dev_url}/projects`, {
          method: "POST",
          body: JSON.stringify({
            title,
            content,
            createdBy: userId
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        dispatch(addProject(res));
      } else {
        let res = await result.json();
        dispatch(addProjectError(res));
      }
    } catch (err) {
      dispatch(addProjectError(err));
    }
  };
};

export const addProject = project => {
  return {
    type: ADD_PROJECT,
    payload: project
  };
};

export const addProjectError = error => {
  return {
    type: ADD_PROJECT_ERROR,
    payload: error
  };
};
