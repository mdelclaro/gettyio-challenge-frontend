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
        return true;
      }
    } catch (err) {
      console.log("Get projects error: " + err);
      return false;
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
        return true;
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
        return true;
      } else {
        let res = await result.json();
        dispatch(addProjectError(res));
        return false;
      }
    } catch (err) {
      dispatch(addProjectError(err));
      return false;
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
    const token = await dispatch(retrieveToken());
    try {
      const result = await timeout(
        fetch(`${dev_url}/projects/${projectId}`, {
          method: "PUT",
          body: JSON.stringify({
            title,
            content
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        dispatch(editProject(res));
        return true;
      } else {
        let res = await result.json();
        dispatch(editProjectError(res));
        return false;
      }
    } catch (err) {
      dispatch(editProjectError(err));
      return false;
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
    const token = await dispatch(retrieveToken());
    try {
      const result = await timeout(
        fetch(`${dev_url}/projects/${projectId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        dispatch(removeProject(projectId));
        return true;
      } else {
        let res = await result.json();
        dispatch(removeProjectError(res));
        return false;
      }
    } catch (err) {
      dispatch(removeProjectError(err));
      return false;
    }
  };
};

export const removeProject = projectId => {
  return {
    type: REMOVE_PROJECT,
    payload: projectId
  };
};

export const removeProjectError = error => {
  return {
    type: REMOVE_PROJECT_ERROR,
    payload: error
  };
};
