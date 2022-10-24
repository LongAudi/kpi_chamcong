import {authAxios} from "../api/axiosClient";
// import Cookies from 'universal-cookie';
import {listUserURL, userEditURL} from "../constants";

export const usersApi = {
    getAll: (params) => {
        const url = '/api/users';
        return authAxios().get(url,{params});
    },
}

export const GetListUserApi =(params={})=> {
    const url = listUserURL;
    return authAxios().get(url,{params});
}

export const PutChangePassApi =(id, params={})=> {
    const url = userEditURL;
    return authAxios().put(url(id), params );
}


export const PutForgotPassApi =(id, params={})=> {
    const url = userEditURL;
    return authAxios().put(url(id), params );
}