import {authAxios} from "../api/axiosClient";
import { manageProjectURL } from "../constants";

export const GetProjectApi =(params={})=> {
    const url = manageProjectURL;
    return authAxios().get(url,{params});
}

export const PostProjectApi = (params={})=>{
    const url = manageProjectURL;
    return authAxios().post(url,params);
}