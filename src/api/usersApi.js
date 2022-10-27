import {authAxios} from "../api/axiosClient";
// import Cookies from 'universal-cookie';
import { manageUserURL, userEditURL} from "../constants";

export const usersApi = {
    getAll: (params) => {
        const url = '/api/users';
        return authAxios().get(url,{params});
    },
}

export const GetListUserApi =(params={})=> {
    const url = manageUserURL;
    return authAxios().get(url,{params});
}

export const PostUserApi = (params={})=>{
    const url = manageUserURL;
    return authAxios().post(url,params);
}

export const PutChangePassApi =(id, params={})=> {
    const url = userEditURL;
    return authAxios().put(url(id), params );
}

export const PutForgotPassApi =(id, params={})=> {
    const url = userEditURL;
    return authAxios().put(url(id), params );
}

