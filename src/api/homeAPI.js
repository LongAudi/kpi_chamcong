import {authAxios} from "./axiosClient";
// import Cookies from 'universal-cookie';
import { manageBreak_ShiftsURL, manageEnd_ShiftsURL, manageLeaves_ShiftsURL, manageProjectURL, manageResume_ShiftsURL, manageStart_ShiftsURL, manageWorkingShiftsURL, manageWorkShifts_LeadURL, postReportURL} from "../constants";


export const GetProjectWithUserAPI =(params={})=> {
    const url = manageProjectURL;
    return authAxios().get(url,{params});
}

export const GetWorkingShiftsUserAPI =(params={})=> {
    const url = manageWorkingShiftsURL;
    return authAxios().get(url,{params});
}
export const GetWorkingShiftsLeadAPI =(params={})=> {
    const url = manageWorkShifts_LeadURL;
    return authAxios().get(url,{params});
}

export const PostTimeStart_ShiftApi = (params={})=>{
    const url = manageStart_ShiftsURL;
    return authAxios().post(url,params);
}

export const PostTimeBreak_ShiftApi = (params={})=>{
    const url = manageBreak_ShiftsURL;
    return authAxios().post(url,params);
}

export const PostTimeResume_ShiftApi = (params={})=>{
    const url = manageResume_ShiftsURL;
    return authAxios().post(url,params);
}

export const PostTimeLeaves_ShiftApi = (params={})=>{
    const url = manageLeaves_ShiftsURL;
    return authAxios().post(url,params);
}

export const PostTimeEnd_ShiftApi = (params={})=>{
    const url = manageEnd_ShiftsURL;
    return authAxios().post(url,params);
}

export const PostReportApi = (params={})=>{
    const url = postReportURL;
    return authAxios().post(url,params);
}

