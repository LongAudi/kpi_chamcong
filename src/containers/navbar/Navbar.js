import React from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Row, Avatar, Layout } from "antd";
import "./navbar.css";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Logo from "../../images/VBPO_Logo.png";
import { authAxios } from "../../api/axiosClient";
import { logout } from "../../app/Actions/auth";
import { logoutURL } from "../../constants";
import Cookies from 'universal-cookie';

const { Header } = Layout;

const cookies = new Cookies();

function Navbar() {
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
      <div className="logo">
        <img src={Logo} alt="" style={{ height: "50px" }} />
      </div>
      <Dropdown
        className="navbarUser"
        overlay={
          <Menu>
            <Menu.Item>
              <UserOutlined style={{ marginRight: "5px" }} />
              <a target="_blank" rel="noopener noreferrer">
                Xem thông tin tài khoản
              </a>
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
          <span className="name" span="{12}">
            {/* {userInfo.username} */}
          </span>
          <Avatar span={12} icon={<UserOutlined />} />
        </Row>
      </Dropdown>
    </Header>
  );
}

export default Navbar;
