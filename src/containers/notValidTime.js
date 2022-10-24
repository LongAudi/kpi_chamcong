import React from "react";

import {Button,Result} from 'antd';



export const NotValidTime =(isValid)=> {

    return (
        isValid &&
        <Result
            status="500"
            title="500"
            subTitle="Giờ hệ thống không hợp lệ, vui lòng kiểm tra lại thời gian trên máy tính."
            extra={<Button type="primary" href={'/'}>Back Home</Button>}
          />
    );
}
