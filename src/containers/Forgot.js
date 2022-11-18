import { Button, Col, Form, Input, Layout, Row } from "antd";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import logoLogin from "../images/logo ITIIS.png";
import Footer from "./Footer";

function Forgot() {
  return (
    <Layout className="layoutUserLogin">
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ height: "94vh" }}
      >
        <Col sm={7} className="FormLogin">
          <div className="content">
            <div className="login">
              <div className="logo-login">
                <img src={logoLogin} alt="" style={{ height: "60px" }} />
              </div>
              <div className="container loginFormInput">
                <Form
                  style={{ paddingTop: "25px" }}
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                    username: "",
                    password: "Vbpo@2022",
                  }}
                  // onFinish={onFinish}
                >
                  <h2>Reset your password</h2>
                  <h4>Input your registered email to reset your password</h4>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Username!",
                      },
                    ]}
                    className="FormItem"
                  >
                    <Input
                      className="inputPageLogin"
                      prefix={<PersonIcon className="site-form-item-icon" />}
                      placeholder="Username"
                    />
                  </Form.Item>
                  <Form.Item className="FormItem">
                    <Button
                      htmlType="submit"
                      className="login-form-button"
                      // loading={loading}
                      // onClick={() => loadings}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </Layout>
  );
}

export default Forgot;
