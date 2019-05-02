import {
  ADD_PROJECT,
  ADD_PROJECT_ERROR,
  SET_PROJECTS,
  EDIT_PROJECT,
  EDIT_PROJECT_ERROR,
  REMOVE_PROJECT,
  REMOVE_PROJECT_ERROR
} from "./types";
import { dev_url } from "../../config/config";
import { retrieveToken } from "./authAction";

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

export const updateProject = data => {
  return async dispatch => {
    const { title, content, projectId } = data;
    try {
      const result = await timeout(
        fetch(`${dev_url}/projects/${projectId}`, {
          method: "PUT",
          body: JSON.stringify({
            title,
            content
          }),
          headers: {
            "Content-Type": "application/json"
            // Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        dispatch(editProject(res));
      } else {
        let res = await result.json();
        dispatch(editProjectError(res));
      }
    } catch (err) {
      dispatch(editProjectError(err));
    }
  };
};

export const editProject = project => {
  return {
    type: EDIT_PROJECT,
    payload: project
  };
};

export const editProjectError = error => {
  return {
    type: EDIT_PROJECT_ERROR,
    payload: error
  };
};

export const deleteProject = projectId => {
  return async dispatch => {
    try {
      const result = await timeout(
        fetch(`${dev_url}/projects/${projectId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
            // Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        dispatch(removeProject(res));
      } else {
        let res = await result.json();
        dispatch(removeProjectError(res));
      }
    } catch (err) {
      dispatch(removeProjectError(err));
    }
  };
};

export const removeProject = project => {
  return {
    type: REMOVE_PROJECT,
    payload: project
  };
};

export const removeProjectError = error => {
  return {
    type: REMOVE_PROJECT_ERROR,
    payload: error
  };
};
