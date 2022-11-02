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
    required: 'Vui lòng nhập ${label} !',
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
  if (err.status === 500) {
      dataError = "Dữ liệu có vấn đề, vui lòng kiểm tra lại"
  }
  if (err.status === 400) {
      dataError = err.data.error
  }
  // const dataError = Object.entries(err.data).map(([key, value]) => <p>{value}</p>)
  openNotificationWithIcon('error', 'Lỗi', dataError)
}

