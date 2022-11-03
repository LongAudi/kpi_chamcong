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
                subTitle="You can not access this page."
                extra={<Link to={'/'}><Button type="primary">Back to the home page</Button></Link>}
              />
        );
    }
}

export default withRouter(
    connect(
    )(BlankLayout)
);
