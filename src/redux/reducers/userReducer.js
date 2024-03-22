import {
  FETCH_USER_LOGIN,
  FETCH_USER_LOGIN_ERROR,
  FETCH_USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REFRESH,
} from "../actions/userAction";

const INITIAL_STATE = {
  dataAcount: { email: "", auth: null, token: "" },
  isLoading: false,
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_USER_LOGIN_SUCCESS:
      console.log("check>>", action);
      return {
        ...state,
        dataAcount: { email: action.data.email, token: action.data.token, auth: true },
        isLoading: false,
        isError: false,
      };
    case FETCH_USER_LOGIN_ERROR:
      return {
        ...state,
        dataAcount: { auth: false },
        isLoading: false,
        isError: true,
      };
    case USER_LOGOUT:
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      return {
        ...state,
        dataAcount: {
          email: "",
          token: "",
          auth: false,
        },
      };
    case USER_REFRESH:
      return {
        ...state,
        dataAcount: {
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token"),
          auth: true,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
