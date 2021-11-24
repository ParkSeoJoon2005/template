const LOGIN = "loginAction/LOGIN";
const SET_LOGIN_DATA = "loginAction/SET_LOGIN_DATA";
const SET_LOGIN_AUTH = "loginAction/SET_LOGIN_AUTH";
const SET_DID_IP_REQUEST = "loginAction/DID_IP_REQUEST";

export const setLogin = (bool) => {
  return {
    type: LOGIN,
    isLogin: bool,
  };
};

export const setLoginData = (data) => {
  return {
    type: SET_LOGIN_DATA,
    loginData: data,
  };
};

export const setLoginAuth = (data) => {
  return {
    type: SET_LOGIN_AUTH,
    didLoginAuth: data,
  };
};

export const setDidIpRequest = (data) => {
  return {
    type: SET_DID_IP_REQUEST,
    didIp: data,
  };
};

const initialState = {
  isLogin: false,
  loginData: null,
  didLoginAuth: false,
  ipData: false,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
      };

    case SET_LOGIN_DATA:
      return {
        ...state,
        loginData: action.loginData,
      };
    case SET_LOGIN_AUTH:
      return {
        ...state,
        didLoginAuth: action.didLoginAuth,
      };
    case SET_DID_IP_REQUEST:
      return {
        ...state,
        ipData: action.ipData,
      };
    default:
      return state;
  }
}
