import { notification } from "antd";
import {authAxios} from "../utils";
import {
  getPushNotificationURL, listChucVuURL
} from "../constants";
import Cookies from 'universal-cookie';
const cookies = new Cookies

export function openNotificationWithIcon (type,message,description) {
  notification[type]({
    message: message,
    description: description
  });
};

export const validateMessages = {
    required: 'Please enter your ${label} !',
    types: {
        email: '${label} không đúng định dạng email!',
        number: '${label} không phải số!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export const errorHandle = (err) =>{
  let dataError
  if (!err.data) {
      return;
  }
  // if (err.status === 500) {
  //     dataError = "Dữ liệu có vấn đề, vui lòng kiểm tra lại"
  // }
  if (err.status === 400) {
      dataError = err.data.error
  }
  // const dataError = Object.entries(err.data).map(([key, value]) => <p>{value}</p>)
  openNotificationWithIcon('error', 'Error', dataError)
}

export function toSlug(str) {
	// Chuyển hết sang chữ thường
	// str = str.toLowerCase();     
 
	// xóa dấu
	str = str
		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
 
	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, 'd');
	
	// Xóa ký tự đặc biệt
	// str = str.replace(/([^0-9a-z-\s])/g, '');
 
	// Xóa khoảng trắng
	str = str.replace(/(\s+)/g, '');
	
	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, '-');
 
	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, '');
 
	// return
	return str;
}