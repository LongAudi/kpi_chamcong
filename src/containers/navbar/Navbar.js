import React from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Row, Avatar, Layout, Col } from "antd";
import "./navbar.css";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Logo from "../../images/VBPO_Logo.png";
import { authAxios } from "../../api/axiosClient";
import { logout } from "../../app/Actions/auth";
import { logoutURL } from "../../constants";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Header } = Layout;

const cookies = new Cookies();

function Navbar() {
  const userInfo = useSelector((state) => state.getUserInfo.userInfo);

  const logout_new = (e) => {
    cookies.remove("token");
    cookies.remove("refresh");
    authAxios()
      .get(logoutURL)
      .then((res) => {
        window.location = "/login";
      });
    logout();
  };
  return (
    <Header className="wrapper">
      <Row style={{ width: "100%" }}>
        <Col span={2}>
          <div className="logo">
            <Link to="/home">
              <img src={Logo} alt="" style={{ height: "50px" }} />
            </Link>
          </div>
        </Col>
        <Col span={20}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["Menu"]}
            className="menuNavbar"
          >
            <Menu.Item key="Admin">
              <span>Admin</span>
              <Link to="/admin"></Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={2}>
          <Dropdown
            className="navbarUser"
            overlay={
              <Menu>
                <Menu.Item>
                  <UserOutlined style={{ marginRight: "5px" }} />
                  {/* <a target="_blank"  rel="noopener noreferrer"> */}
                  <Link to={"/personal_information"}>
                    Xem thông tin tài khoản
                  </Link>
                  {/* </a> */}
                </Menu.Item>
                <Menu.Item onClick={() => logout_new()}>
                  <LogoutOutlined style={{ marginRight: "5px" }} />
                  <a target="_blank" rel="noopener noreferrer">
                    Đăng xuất
                  </a>
                  
                </Menu.Item>
              </Menu>
            }
            placement="bottomLeft"
            arrow
          >
            <Row>
              <span className="avatarNavbar">
                <Avatar icon={<UserOutlined />} />
              </span>
              <span className="nameNavbar">{userInfo.username}</span>
            </Row>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}

export default Navbar;
