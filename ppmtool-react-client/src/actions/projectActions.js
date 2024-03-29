import axios from 'axios';
import { deleteAlert, successAlert } from '../components/alert';
import dispatchAction from './dispatchHelper';
import {
  DELETE_PROJECT,
  GET_ERRORS,
  GET_PROJECT,
  GET_PROJECTS,
  REMOVE_ERRORS,
} from './types';

export const createProject =
  (requestAction, project, history) => async (dispatch) => {
    try {
      await axios.post('/api/project', project);
      history.push('/dashboard');
      successAlert(`Project was ${requestAction}d successfuly!`);
      dispatchAction(dispatch, REMOVE_ERRORS, {});
    } catch (error) {
      dispatchAction(dispatch, GET_ERRORS, error.response.data);
    }
  };

/**
 * Sets the errors in the component props to be empty
 * this is used to clear form errors
 */
export const clearFormErrors = () => (dispatch) => {
  dispatchAction(dispatch, REMOVE_ERRORS, {});
};

export const getProjects = () => async (dispatch) => {
  const res = await axios.get('/api/project/all');
  dispatchAction(dispatch, GET_PROJECTS, res.data);
};

export const getProject = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/${id}`);
    dispatchAction(dispatch, GET_PROJECT, res.data);
  } catch (error) {
    history.push('/dashboard');
  }
};

export const deleteProject = (id) => async (dispatch) => {
  const willDelete = await deleteAlert(
    'You are about to delete this project and all its related data!'
  );

  if (willDelete) {
    const res = await axios.delete(`/api/project/${id}`);
    dispatchAction(dispatch, DELETE_PROJECT, id);
    successAlert(res.data);
  }
};
