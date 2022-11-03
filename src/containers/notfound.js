import React from "react";

import {Button,Result} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";



class NotFoundLayout extends React.Component {

    render() {
        return (
            <Result
                status="404"
                title="404"
                className={'not-found-page'}
                subTitle="URL does not exist."
                extra={<Link to={'/ca-nhan'}><Button type="primary">Back to the home page</Button></Link>}
              />
        );
    }
}

export default withRouter(
    connect(
    )(NotFoundLayout)
);
