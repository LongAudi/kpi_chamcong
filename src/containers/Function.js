import { notification } from "antd";

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

