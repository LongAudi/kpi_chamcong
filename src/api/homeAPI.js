import {authAxios} from "./axiosClient";
// import Cookies from 'universal-cookie';
import { manageProjectURL, manageWorkingShiftsURL} from "../constants";


export const GetProjectWithUserAPI =(params={})=> {
    const url = manageProjectURL;
    return authAxios().get(url,{params});
}

export const GetWorkingShiftsUserAPI =(params={})=> {
    const url = manageWorkingShiftsURL;
    return authAxios().get(url,{params});
}
