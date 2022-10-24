import React from "react";
import {Layout,Row,Col,Card} from 'antd';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./Login";
import {logout} from "../app/Actions/auth";

const {Footer} = Layout;
class UserLayout extends React.Component {
    render() {
        return (
            <Layout className="layoutUserLogin">
                    <Row type="flex" justify="center" align="middle" style={{height: '90vh'}}>
                        <Col sm={6}>
                            <Card title="ĐĂNG NHẬP" bordered={false} hoverable={false} style={{boxShadow:"5px 8px 24px 5px rgba(208, 216, 243, 0.6)"}}>
                                <Login />
                            </Card>
                        </Col>
                    </Row>
                    <Footer style={{textAlign: 'center',height: '10vh'}}>VBPO ©{(new Date().getFullYear())} Made by DRI-A Team</Footer>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(UserLayout)
);
