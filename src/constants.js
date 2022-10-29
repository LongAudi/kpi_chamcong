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