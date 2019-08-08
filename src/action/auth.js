import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  LOADING_START,
  LOADING_END,
  SIGNOUT_SUCCESS
} from "../reducers/auth-reducer";
import { PERMISSIONS } from "../utils/Constes";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;

function SigniInSuccess(data) {
  return {
    type: SIGNIN_SUCCESS,
    playload: data
  };
}

function SignInError(error) {
  return {
    type: SIGNIN_ERROR,
    playload: error
  };
}

function Loading(bool) {
  return {
    type: bool ? LOADING_START : LOADING_END,
    playload: null
  };
}
function SignOutSuccess(data) {
  return {
    type: SIGNOUT_SUCCESS,
    playload: data
  };
}
export function Login(username, password) {
  return async dispatch => {
    try {
      console.log(process.env);
      dispatch(Loading(true));
      const data = await axios.post(
        `${BASE_URL}/auth/sign-in`,
        {
          username: username,
          password: password
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken")
          }
        }
      );
      if (
        data.data.data.type === "USER" ||
        data.data.data.type === "SHOP_USER"
      ) {
        throw new Error("incorect token");
      }
      dispatch(SigniInSuccess(data.data.data));
      localStorage.setItem("accessToken", data.data.data.accessToken);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        alert(error.response.data.errors);
        dispatch(SignInError(error.response.data.errors));
      } else {
        alert(error.message);
        dispatch(SignInError(error.message));
      }
    } finally {
      dispatch(Loading(false));
    }
  };
}

export function IsSignIn(token) {
  return async dispatch => {
    try {
      dispatch(Loading(true));
      const data = await axios.get(`${BASE_URL}/is-sign-in`, {
        headers: {
          Authorization: token
        }
      });
      dispatch(SigniInSuccess(data.data.data));
    } catch (error) {
      dispatch(SignInError(error.response.data.errors));
    } finally {
      dispatch(Loading(false));
    }
  };
}

export function Logout() {
  return async dispatch => {
    try {
      localStorage.clear();
      dispatch(SignOutSuccess({}));
    } catch (error) {
      alert("somethin wrong");
    }
  };
}
