import React from "react";
import { Layout, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login";
import { logout } from "../app/Actions/auth";
import Footer from "./Footer";
import logoLogin from "../images/logo ITIIS.png"

class UserLayout extends React.Component {
  render() {
    return (
      <Layout className="layoutUserLogin">
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "94vh" }}
        >
          <Col sm={7} className="FormLogin">
            <Login />
          </Col>
        </Row>
        <Footer />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token !== null,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserLayout)
);
