import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import Cookies from 'js-cookie';

export const loadUser = () => (dispatch,getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });


    axios
    .get('http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/auth/user/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

  
  // REGISTER USER
  export const register = ({ username, password, email }) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // Request Body
    const body = JSON.stringify({ username, email, password });
  
    axios
      .post('http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/auth/register/', body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch(createMessage({Register_Success: "Register Success"}));
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

  
  // LOGIN USER
  export const login = (username, password) => (dispatch) => {
    console.log("Hello, world!");

    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // Request Body
    const body = JSON.stringify({ username, password });
  
    axios
      .post('http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/auth/login/', body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(createMessage({Login_Success: "Login Success"}));
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

  // LOGOUT USER
export const logout = () => (dispatch) => {
    axios
      .post('http://es-django-env.eba-bpqhs6uc.us-east-1.elasticbeanstalk.com/auth/logout/')
      .then((res) => {
        dispatch({ type: 'CLEAR_LEADS' });
        dispatch({
          type: LOGOUT_SUCCESS,
        });
        
        Cookies.remove('jwt');
        dispatch(createMessage({Logout_Success: "Logout Success"}));
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };

  export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // If token, add to headers config
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return config;
  };




  