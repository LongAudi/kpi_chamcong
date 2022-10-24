import axios from "axios";
import * as actionTypes from "./actionTypes";
import Cookies from 'universal-cookie';
import {loginURL} from "../../constants";
import {openNotificationWithIcon} from "../../containers/Function";
const cookies = new Cookies();

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};


export const authSuccess = token => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      token: token
    };
  };

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post(loginURL, {
                username: username,
                password: password
            })
            .then(res => {
                const token = res.data.access;
                const refresh = res.data.refresh;
                cookies.set('token',token);
                cookies.set('refresh',refresh);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(60*60 *24 *15)); // 15d
            })
            .catch(err => {
                // openNotificationWithIcon('error', 'Lỗi kết nối', 'Lỗi kết nối, kiểm tra kết nối tới server !!!')
                if (err.request.status === 401) {
                    openNotificationWithIcon('error', 'Lỗi', 'Vui lòng kiểm tra thông tin đăng nhâp.')
                    // message.error('Lỗi kết nối, kiểm tra kết nối tới server !!!', 10);
                }
                if (err.request.status === 0) {
                    openNotificationWithIcon('error', 'Lỗi kết nối', 'Lỗi kết nối, kiểm tra kết nối tới server !!!')
                    // message.error('Lỗi kết nối, kiểm tra kết nối tới server !!!', 10);
                }
                dispatch(authFail(err));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
      const token = cookies.get("token");
      if (token === undefined) {
        dispatch(logout());
      } else {
          dispatch(authSuccess(token));
      }
    };
  };