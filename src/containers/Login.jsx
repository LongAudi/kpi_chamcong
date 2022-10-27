import React from "react";
import { Form, Input, Button, Modal, Col, Row } from 'antd';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    UserOutlined, LockOutlined, CloseCircleOutlined, EyeTwoTone, EyeInvisibleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css'
import { authLogin } from "../app/Actions/auth";
import { PutForgotPassApi } from "../api/usersApi";
import { openNotificationWithIcon } from "./Function";

const validateMessages = {
    required: 'Vui lòng nhập ${label} !',
    types: {
      email: '${label} không đúng định dạng email!',
      number: '${label} không phải số!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  

class LoginForm extends React.Component {
    state = {
        username: "",
        password: "",
        loadings: false,
        modalVisibleRestPass: false,
      };
    
      onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
      handleModalForgotPass = () => {
        // messageBox('warning', 'Thông báo', 'Chức năng đang phát triển')
        this.setState({
          modalVisibleRestPass: true,
        });
      };
    onFinishForgotPass = (values) => {
        this.setState({ loading: true })

        PutForgotPassApi({
            email: values.email
        }).then(res => {
            if (res.data.error) {
                const dataError = Object.entries(res.data.error).map(([key, value]) => <p>{value}</p>)
                openNotificationWithIcon('error', 'Lỗi', dataError)
                this.setState({ modalVisibleRestPass: false })

            }
            else {
                openNotificationWithIcon('success', 'Thông báo', 'Đăng ký đặt lại mật khẩu thành công. Vui lòng kiểm tra hộp thư')
                this.setState({ modalVisibleRestPass: true })
                // this.logout_new()
            }
            this.setState({ loading: false })
        })
            .catch(err => {
                console.log(err);
            });
    };

    handleModalCancel = () => {
        this.setState({ modalVisibleRestPass: false });
    };
    ForgotPass = (modalVisibleRestPass) => {

        return (
            <Modal
                destroyOnClose
                title="Đặt lại mật khẩu"
                visible={modalVisibleRestPass}
                onCancel={this.handleModalCancel}
                footer={null}
                closeIcon={<CloseCircleOutlined title="Thoát (ESC)" />}
                keyboard // press esc to close
                style={{ width: '500px', "top": '250px' }}
            >
                <Form
                
                    onFinish={(values) => this.onFinishForgotPass(values)} validateMessages={validateMessages}
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }} 
                >
                    <Col sm={24} > 
                        <Form.Item name='email'
                            rules={[{
                                required: true,
                                type: 'email'
                            },]}
                            label={"Email đã đăng ký"}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col sm={24}>
                        <Form.Item name='tenND'
                            rules={[{
                                required: true,
                                type: 'tenND'
                            },]}
                            label={"Tên người dùng"}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Row style={{ paddingBottom: '10px' }}>
                        <Col span={24} style={{ textAlign: "center" }}>
                            <Button shape="round" size="default" type="primary" htmlType="submit">Đặt lại mật khẩu </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    };

    render() {
        const { error, loading, token } = this.props;
        const { loadings } = this.state;
        if (token) {
            // localStorage.setItem("currentSelectedKeys", JSON.stringify(['2']))
            return (
                (<Redirect to="/home" />))
        }
        const onFinish = (values) => {
            this.props.login(values.username, values.password);
        };

        return (
            <div className="content">
                <div className="login">
                    <div className="logo-login">
                        {/* <img src={Logo} alt="" style={{ width: "25vh" }} /> */}
                        <h1>Login</h1>
                    </div>
                    <div className="container loginFormInput">
                        <Form
                            style={{ paddingTop: '25px' }}
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                                username:'admin',
                                password:'Vbpo@12345',
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Tên người dùng!',
                                    },
                                ]}
                                className="FormItem"
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Đăng nhập" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Mật khẩu!',
                                    },
                                ]}
                                className="FormItem"
                                >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Mật khẩu"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item className="FormItem">
                                <span onClick={() =>this.setState({ modalVisibleRestPass: true })} className="login-form-forgot " style={{ cursor: "pointer", color: "#0078d7" }}>Forgot Password ?</span>
                            </Form.Item>
                            <Form.Item className="FormItem">
                                <Button htmlType="submit" className="login-form-button" loading={loading} onClick={() => loadings}>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                        {this.ForgotPass(this.state.modalVisibleRestPass)}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(authLogin(username, password))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);