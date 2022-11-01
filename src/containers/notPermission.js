import React from "react";

import {Button,Result} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";



class BlankLayout extends React.Component {

    render() {
        return (
            <Result
                status="403"
                title="403"
                className={'not-found-page'}
                subTitle="Bạn không có quyền truy cập trang này."
                extra={<Link to={'/ca-nhan'}><Button type="primary">Về trang chủ</Button></Link>}
              />
        );
    }
}

export default withRouter(
    connect(
    )(BlankLayout)
);
