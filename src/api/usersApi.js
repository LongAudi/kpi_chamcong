import {authAxios} from "../api/axiosClient";
// import Cookies from 'universal-cookie';
import { listChucVuURL, manageUserAdminURL, manageUserURL, userEditURL, userInfoURL} from "../constants";

export const usersApi = {
    getAll: (params) => {
        const url = '/api/users';
        return authAxios().get(url,{params});
    },
}

export const GetListUserApi =(params={})=> {
    const url = manageUserAdminURL;
    // const url = manageUserURL;
    return authAxios().get(url,{params});
}

export const GetUserEditApi =(params={})=> {
    const url = userEditURL;
    return authAxios().get(url(params));
}

export const PostUserApi = (params={})=>{
    // const url = manageUserURL;
    const url = manageUserAdminURL;
    return authAxios().post(url,params);
}

export const PutUserApi =(id,params={})=> {
    const url = userEditURL;
    return authAxios().put(url(id),params);
}

export const GetRoleApi =(params={})=> {
    const url = listChucVuURL;
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

export const UserInfoUrlApi =(params={})=> {
    const url = userInfoURL;
    return authAxios().get(url,params);
}