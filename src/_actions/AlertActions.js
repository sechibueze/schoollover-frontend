import { SET_ALERT, CLEAR_ALERT, LOADED } from './types';


export const setAlert = (alertText, origin = 'AUTH', type="danger",  timeout = 30000) => dispatch => {

  const alertId = Math.floor(Math.random() * 10);
  /****
   * origin: used to filter location to display alert
   * type: used to control the color of the alert box
   * alertId: used to clear unwanted alert
   * alerttext: the message to display
   */
  dispatch({
    type: SET_ALERT,
    payload: { alertText, alertId, origin, type }
  });

  setTimeout(() => (dispatch({
    type: CLEAR_ALERT,
    payload: alertId
  })), timeout)
}

export const clearAlert = (alertId = null) => dispatch => {
    /*** When no arg is passed, every alert is cleared */
  dispatch({
    type: CLEAR_ALERT,
    payload: alertId
  });
  dispatch({
    type: LOADED
  });
};
