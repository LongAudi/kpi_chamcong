import React from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Col, Row, Avatar } from "antd";
import "./header.css";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

function Header() {
  return (
    <header className="wrapper">
      <Row className="inner">
        <div className="logo">logo</div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <UserOutlined style={{ marginRight: "5px" }} />
                <a target="_blank" rel="noopener noreferrer">
                  Xem thông tin tài khoản
                </a>
              </Menu.Item>
              <Menu.Item 
              // onClick={() => logout_new()}
              >
                <LogoutOutlined style={{ marginRight: "5px" }} />
                <a target="_blank" rel="noopener noreferrer">
                  Đăng xuất
                </a>
              </Menu.Item>
            </Menu>
          }
          placement="bottomLeft" arrow
        >
          <Row>
            <span className="name" span="{12}">
              {/* {userInfo.username} */}
            </span>
            <Avatar span={12} icon={<UserOutlined />} />
          </Row>
        </Dropdown>
      </Row>
    </header>
  );
}

export default Header;
