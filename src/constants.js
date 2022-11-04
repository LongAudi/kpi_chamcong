import {localhost} from "./server";
const apiURL = "/api";
// const apiURLS = "/org"

export const endpoint = `${localhost}${apiURL}`;
// export const endpoints = `${localhost}${apiURLS}`;

export const loginURL = `${endpoint}/token/`;
export const authURL = `${endpoint}/verify_token_login/`;
export const token_refresh_URL = `${endpoint}/token/refresh/`;
export const logoutURL = `${endpoint}/logout/`;

export const userInfoURL = `${endpoint}/infor-user/`;
export const userEditURL =  id => `${endpoint}/infor-user-detail/${id}`;
export const listChucVuURL = `${endpoint}/group-role/`;

export const manageUserURL = `${endpoint}/manage-user/`;
export const manageProjectURL =`${endpoint}/manage-project/`
export const projectEditURL =  id => `${endpoint}/infor-project-detail/${id}`;
export const manageUserAdminURL = `${endpoint}/manage-user-admin/`;


export const getPushNotificationURL = `${endpoint}/notification-is-sent/`; 
export const ListNotification = `${endpoint}/list-notification/`;
export const ReadAllNotificationURL = `${endpoint}/notification-read-all/`; 
export const ReadNotification = `${endpoint}/notification-read/`; 
export const postNotification = `${endpoint}/send-notification/`; 


export const manageWorkingShiftsURL =`${endpoint}/manage-working-shifts/`
export const manageWorkShifts_LeadURL =`${endpoint}/working-shifts-lead/`
export const manageStart_ShiftsURL =`${endpoint}/manage-start/`
export const manageBreak_ShiftsURL =`${endpoint}/manage-break/`
export const manageResume_ShiftsURL =`${endpoint}/manage-resume/`
export const manageLeaves_ShiftsURL =`${endpoint}/manage-leaves/`
export const manageEnd_ShiftsURL =`${endpoint}/manage-end/`

export const postReportURL =`${endpoint}/manage-report/`







