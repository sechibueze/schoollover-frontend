import {
    LOADING,
    LOADED,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_CURRENT_USER,
    AUTH_ERROR,
    LOGOUT,

    REQUEST_PASSWORD_RESET,
    RESET_PASSWORD,
    CONFIRM_USER_ACCOUNT,
  } from '../_actions/types';

  const initialState = {
    token: null,
    isAuthenticated: null,
    currentUser: null,
    loading: false,
    authConfirmAccount: null,
    authRequestPasswordReset: null,
    authResetPassword: null,
  };

  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SIGNUP_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          token: payload,
          isAuthenticated: true
        };
      case SIGNUP_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:  
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          loading: false,
          token: null,
          isAuthenticated: null,
          currentUser: null
        };
      case LOAD_CURRENT_USER:
        return {
          ...state,
          currentUser: payload,
          isAuthenticated: true
        };
      case CONFIRM_USER_ACCOUNT:
        return {
          ...state,
          authConfirmAccount: payload,
        };
      case REQUEST_PASSWORD_RESET:
        return {
          ...state,
          authRequestPasswordReset: payload,
        };
      case RESET_PASSWORD:
        return {
          ...state,
          authResetPassword: payload,
        };
      
      case LOADING:
        return {
          ...state,
          loading: true
        };
      case LOADED:
        return {
          ...state,
          loading: false
        };
      default:
        return state;
    }
  };