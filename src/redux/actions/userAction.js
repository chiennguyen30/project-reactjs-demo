import { toast } from "react-toastify";
import { LoginApi } from "../../services/UserService";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const FETCH_USER_LOGIN_ERROR = "FETCH_USER_LOGIN_ERROR";

export const USER_LOGOUT = "USER_LOGOUT";
export const USER_REFRESH = "USER_REFRESH";

export const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_LOGIN });
    let res = await LoginApi(email.trim(), password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("email", res.email);
      dispatch({ type: FETCH_USER_LOGIN_SUCCESS, data: { email: email.trim(), token: res.token } });
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }

      dispatch({ type: FETCH_USER_LOGIN_ERROR });
    }
  };
};

export const handleLogOutRedux = (req, res) => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGOUT,
    });
  };
};
export const handleRefresh = (req, res) => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_REFRESH,
    });
  };
};
