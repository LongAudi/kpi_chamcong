import {authAxios} from "../api/axiosClient";
import { manageProjectURL, projectEditURL } from "../constants";

export const GetProjectApi =(params={})=> {
    const url = manageProjectURL;
    return authAxios().get(url,{params});
}

export const PostProjectApi = (params={})=>{
    const url = manageProjectURL;
    return authAxios().post(url,params);
}

export const GetProjectEditApi =(params={})=> {
    const url = projectEditURL;
    return authAxios().get(url(params));
}

export const PutProjectEditApi =(id,params={})=> {
    const url = projectEditURL;
    return authAxios().put(url(id),params);
}