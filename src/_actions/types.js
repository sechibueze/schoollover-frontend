export const baseURL = process.env.NODE_ENV === 'production' ? 'https://schoollover-api-backend-610836.us1.kinto.io' : 'http://localhost:5000';
export const APP_NAME = 'ELF';

/*********** PROJECTS ******** */
export const RESET_PROJECT_DATA = "RESET_PROJECT_DATA";

/**** INPUT FLAGS ******** */
export const SIGNUP_INPUT_ALERT = "SIGNUP_INPUT_ALERT";

/**** AUTH *********/
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOAD_CURRENT_USER = "LOAD_CURRENT_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOADING = "LOADING";
export const LOADED = "LOADED";
export const LOGOUT = "LOGOUT";

export const CONFIRM_USER_ACCOUNT = "CONFIRM_USER_ACCOUNT";
export const REQUEST_PASSWORD_RESET = "REQUEST_PASSWORD_RESET";
export const RESET_PASSWORD = "RESET_PASSWORD";

/**** ALERTS ******** */
export const CLEAR_ALERT = "CLEAR_ALERT";
export const SET_ALERT = "SET_ALERT";