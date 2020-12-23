
import { getRequestConfig } from './AuthActions';
import { setAlert } from './AlertActions';
import { 
    CREATE_PROJECT,
    UPDATE_PROJECT_DATA,
    RESET_PROJECT_DATA,
    DELETE_PROJECT,
    GET_PROJECT_LIST,
    TOGGLE_PROJECT_VISIBILITY,
    baseURL,
    LOADING,
    LOADED
 } from './types';

 /*** Initialize a new projects */
 export const createProject = projectData => dispatch => {
    dispatch({type: LOADING})
    const requestConfig = getRequestConfig('POST', projectData);
    const url = `${baseURL}/api/projects`;

    fetch(url, requestConfig)
        .then(response => {
            if(response.ok) return response.json();

            response.json().then(errorObject => {
                dispatch(setAlert(errorObject.error, CREATE_PROJECT, 'danger'));
                dispatch({ type: LOADED});
            })
        }).then(data => {
            if(data) {
                dispatch({
                    type: CREATE_PROJECT,
                    payload: data.data
                });
                dispatch(setAlert(data.message, CREATE_PROJECT, 'success'));
                dispatch({ type: LOADED});
            }
        }).catch(err => {

            dispatch(setAlert('Network error', CREATE_PROJECT));
            dispatch({ type: LOADED });
        })
 }

 /*** Update an existing project */
 export const updateProjectById = projectData => dispatch => {
    dispatch({type: LOADING})
    const requestConfig = getRequestConfig('PUT', projectData);
    const url = `${baseURL}/api/projects?id=${projectData._id}`;

    fetch(url, requestConfig)
        .then(response => {
            if(response.ok) return response.json();

            response.json().then(errorObject => {
                dispatch(setAlert(errorObject.error, UPDATE_PROJECT_DATA, 'danger'));
                dispatch({ type: LOADED});
            })
        }).then(data => {
            if(data) {
                dispatch({
                    type: UPDATE_PROJECT_DATA,
                    payload: data.data
                });
                dispatch(setAlert(data.message, UPDATE_PROJECT_DATA, 'success'));
                dispatch({ type: LOADED});
            }
        }).catch(err => {

            dispatch(setAlert('Network error', UPDATE_PROJECT_DATA));
            dispatch({ type: LOADED });
        })
 }

 /*** Update the visibility of a project */
 export const toggleProjectVisibility = id => dispatch => {
    dispatch({type: LOADING})
    const requestConfig = getRequestConfig('PUT');
    const url = `${baseURL}/api/projects/${id}/visibility`;

    fetch(url, requestConfig)
        .then(response => {
            if(response.ok) return response.json();

            response.json().then(errorObject => {
                dispatch(setAlert(errorObject.error, TOGGLE_PROJECT_VISIBILITY, 'danger'));
                dispatch({ type: LOADED});
            })
        }).then(data => {
            if(data) {
                dispatch({
                    type: TOGGLE_PROJECT_VISIBILITY,
                    payload: data.data
                });
                dispatch(setAlert(data.message, TOGGLE_PROJECT_VISIBILITY, 'success'));
                dispatch({ type: LOADED});
            }
        }).catch(err => {

            dispatch(setAlert('Network error', TOGGLE_PROJECT_VISIBILITY));
            dispatch({ type: LOADED });
        })
 }

 /*** Get a listing of projects based on query filters */
 export const getProjectList = () => dispatch => {
    dispatch({type: LOADING})
    const requestConfig = getRequestConfig();
    const url = `${baseURL}/api/projects`;

    fetch(url, requestConfig)
        .then(response => {
            if(response.ok) return response.json();

            response.json().then(errorObject => {
                dispatch(setAlert(errorObject.error, GET_PROJECT_LIST, 'danger'));
                dispatch({ type: LOADED});
            })
        }).then(data => {
            if(data) {
                dispatch({
                    type: GET_PROJECT_LIST,
                    payload: data.data
                });
                dispatch({ type: LOADED});
            }
        }).catch(err => {

            dispatch(setAlert('Network error', GET_PROJECT_LIST));
            dispatch({ type: LOADED });
        })
 }

  /*** Update an existing project */
  export const deleteProjectById = id => dispatch => {
    dispatch({type: LOADING})
    const requestConfig = getRequestConfig('DELETE');
    const url = `${baseURL}/api/projects?id=${id}`;

    fetch(url, requestConfig)
        .then(response => {
            if(response.ok) return response.json();

            response.json().then(errorObject => {
                dispatch(setAlert(errorObject.error, DELETE_PROJECT, 'danger'));
                dispatch({ type: LOADED});
            })
        }).then(data => {
            if(data) {
                dispatch({
                    type: DELETE_PROJECT,
                    payload: data.data
                });
                dispatch(setAlert(data.message, DELETE_PROJECT, 'success'));
                dispatch({ type: LOADED});
            }
        }).catch(err => {

            dispatch(setAlert('Network error', DELETE_PROJECT));
            dispatch({ type: LOADED });
        })
 }

 export const resetProjectData = () => dispatch => {
     dispatch({ type: RESET_PROJECT_DATA })
 }