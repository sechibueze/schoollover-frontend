import { setAlert } from './AlertActions';
import { baseURL, LOADED, LOADING, SIGNUP_SUCCESS, SIGNUP_FAIL, AUTH_ERROR, LOAD_CURRENT_USER, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REQUEST_PASSWORD_RESET, RESET_PASSWORD, CONFIRM_USER_ACCOUNT} from './types';

/*** Configure Hearder for Request ****/
export const getRequestConfig = (method="GET", body = null ) => {
  let requestConfig = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(payload) // body data type must match "Content-Type" header
    };
    /** Retrieve <token> from localStorage */
    const token = localStorage.getItem('token');
    if (token) {
      requestConfig.headers['x-auth-token'] = token;
    }
    if(body){
      requestConfig["body"] = JSON.stringify(body)
    }

    return requestConfig;
};

/*** Load the currently logged in user */
export const loadCurrentUser = () => dispatch => {
    const url = `${ baseURL }/api/auth`;
    const requestConfig = getRequestConfig();
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        response.json().then(errorResponse => dispatch(setAlert(errorResponse.error, AUTH_ERROR)))       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: LOAD_CURRENT_USER,
            payload: data.data
          });        
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        dispatch(setAlert('Network error, please try again later', AUTH_ERROR));
        dispatch({ type: LOADED })
      });
}

/*** Allow new users to signup */
export const signup = userData => dispatch => {
  dispatch({ type: LOADING })
    const url = `${ baseURL }/api/auth/signup`;
    let requestConfig = getRequestConfig("POST", userData);
    
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        response.json().then(errorResponse => {
          dispatch(setAlert(errorResponse.error, SIGNUP_FAIL));
          dispatch({ type: LOADED });
        })
        
      })
      .then(data => {
        if (data) {
          const { token } = data;
          localStorage.setItem('token', token);
          dispatch(loadCurrentUser());
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: token
          });         
          dispatch({ type: LOADED });
        }
      })
      .catch(err => {      
        dispatch(setAlert('Network error, Try later', SIGNUP_FAIL));
        dispatch({ type: LOADED })
      })
};

/**** Allow existing Users to login */
export const login = userData => dispatch => {
  dispatch({ type: LOADING });

  const url = `${ baseURL }/api/auth/login`;
  const body = JSON.stringify(userData);
  let requestConfig = getRequestConfig('POST', body);
    // Call the login endpoint
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        // Response is outsie 2xx range
        response.json().then(errorResponse => dispatch(setAlert(errorResponse.error, LOGIN_FAIL)));
        
      })
      .then(data => {
        if (data) {
          const { token } = data;
          localStorage.setItem('token', token);

          dispatch(loadCurrentUser());

          dispatch({
            type: LOGIN_SUCCESS,
            payload: token
          });
          
          dispatch({ type: LOADED })
        }
      }) 
      .catch(err => {
        dispatch(setAlert('Network error', LOGIN_FAIL));
        dispatch({ type: LOADED })
      })
};

/**** Allow new user to confirm email account after signup */
export const confirmUserAccount = userData => dispatch => {
  dispatch({ type: LOADING });

  const url = `${ baseURL }/api/auth/${ userData.id }/account_confirmation`;
  
  let requestConfig = getRequestConfig();

    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        // Response is outsie 2xx range
        response.json().then(errorResponse => dispatch(setAlert(errorResponse.error, CONFIRM_USER_ACCOUNT)));
        
      })
      .then(data => {
        if (data) {

          dispatch({
            type: CONFIRM_USER_ACCOUNT,
            payload: data.data
          });
          
          dispatch(setAlert(data.message, CONFIRM_USER_ACCOUNT, 'success'));

          dispatch({ type: LOADED })
        }
      }) 
      .catch(err => {
        dispatch(setAlert('Network error', CONFIRM_USER_ACCOUNT));
        dispatch({ type: LOADED })
      })
};

/**** Allow user who ForgotPassword  to request a link so they can reset their password */
export const requestPasswordReset = userData => dispatch => {
  dispatch({ type: LOADING });

  const url = `${ baseURL }/api/auth/request-password-reset-token`;
  const body = JSON.stringify(userData);
  let requestConfig = getRequestConfig('PUT', body);

    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        // Response is outsie 2xx range
        response.json().then(errorResponse => dispatch(setAlert(errorResponse.error, REQUEST_PASSWORD_RESET)));
        
      })
      .then(data => {
        if (data) {

          dispatch({
            type: REQUEST_PASSWORD_RESET,
            payload: data.data
          });
          
          dispatch(setAlert(data.message, REQUEST_PASSWORD_RESET, 'success'));

          dispatch({ type: LOADED })
        }
      }) 
      .catch(err => {
        dispatch(setAlert('Network error', REQUEST_PASSWORD_RESET));
        dispatch({ type: LOADED })
      })
};

/**** Allow user who ForgotPassword and receive an email with a passswordReset link reset their password */
export const resetPassword = userData => dispatch => {
  dispatch({ type: LOADING });

  const url = `${ baseURL }/api/auth/reset-auth-password`;
  const body = JSON.stringify(userData);
  let requestConfig = getRequestConfig('PUT', body);

    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        // Response is outsie 2xx range
        response.json().then(errorResponse => dispatch(setAlert(errorResponse.error, RESET_PASSWORD)));
        
      })
      .then(data => {
        if (data) {

          dispatch({
            type: RESET_PASSWORD,
            payload: data.data
          });
          
          dispatch(setAlert(data.message, RESET_PASSWORD, 'success'));

          dispatch({ type: LOADED })
        }
      }) 
      .catch(err => {
        dispatch(setAlert('Network error', RESET_PASSWORD));
        dispatch({ type: LOADED })
      })
};


export const logout = () => dispatch => {
  dispatch({ type: LOGOUT});
}