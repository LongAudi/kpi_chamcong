import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Row, Avatar, Layout, Col, Button, Card } from "antd";
import "./navbar.css";
import { UserOutlined, LogoutOutlined, BellFilled } from "@ant-design/icons";
import Logo from "../../images/LOGO ITIS.png";
import { authAxios } from "../../api/axiosClient";
import { logout } from "../../app/Actions/auth";
import {
  logoutURL,
  ListNotification,
  ReadAllNotificationURL,
  ReadNotification,
  getPushNotificationURL,
} from "../../constants";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPushNotification } from "../Function";
import moment from "moment";
import { SurroundSoundTwoTone, BarChart } from "@mui/icons-material";

const { Header } = Layout;

const cookies = new Cookies();

function Navbar() {
  const userInfo = useSelector((state) => state.getUserInfo.userInfo);
  const [lsNotification, setLsNotification] = useState([]);
  const [countNoti, setCountNoti] = useState([]);
  const [loadingNoti, setLoadingNoti] = useState(false);

  const logout_new = (e) => {
    authAxios(cookies.get("token"))
      .get(logoutURL)
      .then((res) => {
        cookies.remove("token");
        cookies.remove("refresh");
        window.location = "/login";
      });
    logout();
  };

  const fetchNotification = () => {
    setLoadingNoti(true);
    authAxios(cookies.get("token"))
      .get(ListNotification)
      .then((res) => {
        setLsNotification(res.data);
        setCountNoti(res.data.filter((item) => item.is_view == false).length);
      })
      .catch((err) => {
        setLoadingNoti(false);
      });
  };

  const getPushNotification = () => {
    return authAxios(cookies.get("token")).get(getPushNotificationURL);
  };

  useEffect(() => {
    setLoadingNoti(true);
    fetchNotification();
    try {
      setInterval(async () => {
        fetchNotification();
        getPushNotification().then((res) => {
          if (res.data.length > 0) {
            const notiData = res.data[0];
            const notification = new Notification("STAFF", {
              body: notiData.content,
              icon: "./VBPO_Logo.png",
            });
            notification.onclick = function () {
              window.location.href = "/tickets/" + notiData.ticket_rel_id;
            };
          }
        });
      }, 1000000); //300000
    } catch (e) {
      console.log(e);
    }
  }, []);

  const NotificationsCard = (data) => {
    const [currentKey, setCurrentKey] = useState("tab1");
    const onTabChange = (key) => {
      setCurrentKey(key);
    };
    const tabList = [
      {
        key: "tab1",
        tab: "Mới",
      },
      {
        key: "tab2",
        tab: "Tất cả",
      },
    ];
    const ReadAllNotification = () => {
      authAxios(cookies.get("token"))
        .post(ReadAllNotificationURL)
        .then((res) => {
          fetchNotification();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const ReadNotificationFn = (notiId) => {
      authAxios(cookies.get("token"))
        .post(ReadNotification, { notification_id: notiId })
        .then((res) => {
          fetchNotification();
          // window.location.href = "/tickets/" + ticketId;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const NotiNew = (listNotification) => {
      return (
        <>
          {listNotification.map((item, index) => (
            <Row
              style={{
                textAlign: "center",
                backgroundColor: "#ffffff",
                marginBottom: 5,
              }}
              key={item.id}
            >
              <Col sm={6}>
                <span>{moment(item.created_at).format("L HH:mm")}</span>
              </Col>
              <Col sm={8}>
                <span>{item.username}</span>
              </Col>
              <Col sm={10}>
                {item.is_view ? (
                  <a
                    style={{ color: "#e0e0e0" }}
                    onClick={(e) => ReadNotificationFn(item.id)}
                  >
                    {item.content}
                  </a>
                ) : (
                  <a onClick={(e) => ReadNotificationFn(item.id)}>
                    {item.content}
                  </a>
                )}
              </Col>
            </Row>
          ))}
        </>
      );
    };
    const NotiBlank = () => {
      return (
        <Row>
          <Col sm={14} offset={5}>
            <h3 style={{ fontSize: 30, textAlign: "center" }}>
              <SurroundSoundTwoTone />
            </h3>
            <h3 style={{ textAlign: "center" }}>Bạn đã xem hết thông báo</h3>
          </Col>
        </Row>
      );
    };
    const contentList = {
      tab1:
        data.data.filter((item) => !item.is_view).length > 0
          ? NotiNew(data.data.filter((item) => !item.is_view))
          : NotiBlank(),
      tab2: NotiNew(data.data),
    };
    const hasReadAll =
      data.data.filter((item) => !item.is_view).length > 0 ? (
        <a type={"primary"} onClick={(e) => ReadAllNotification()}>
          Đánh dấu đã đọc
        </a>
      ) : (
        ""
      );

    useEffect(() => {
      const toggleIcon = document.querySelector(".toggleMenu");
      toggleIcon.addEventListener("click", () => {
        document.querySelector(".menuNavbar").classList.toggle("active");
      });
    }, []);
    return (
      <>
        <Col span={22}>
          <Card
            className={"notification-card"}
            style={{ width: "360px", height: "410px" }}
            // onScroll="true"
            title="Thông báo"
            extra={hasReadAll}
            tabList={tabList}
            activeTabKey={currentKey}
            onTabChange={(key) => {
              onTabChange(key);
            }}
            bodyStyle={{ overflowY: "auto", height: "300px" }}
          >
            {contentList[currentKey]}
          </Card>
        </Col>
      </>
    );
  };

  return (
    <div className="navbar">
      <Header className="wrapper">
        <Row className="RowNavbar">
          <Col span={2}>
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="" style={{ height: "50px" }} />
              </Link>
            </div>
          </Col>
          <Col span={16}>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["Menu"]}
              className="menuNavbar"
            >
              {userInfo.group_role === 1 ? (
                <Menu.Item key="Admin">
                  <span>Admin</span>
                  <Link to="/admin"></Link>
                </Menu.Item>
              ) : (
                ""
              )}
              {userInfo.group_role === 2 ? (
                <Menu.Item key="home">
                  <span>Home</span>
                  <Link to="/home"></Link>
                </Menu.Item>
              ) : (
                ""
              )}

              {userInfo.group_role === 2 || 1 ? (
                <Menu.Item key="WorkingDetails">
                  <span>Working Details</span>
                  <Link to="/working_details"></Link>
                </Menu.Item>
              ) : (
                ""
              )}
              {userInfo.group_role === 1 ? (
                <Menu.Item key="ProjectManagement">
                  <span>Project Management</span>
                  <Link to="/project_management"></Link>
                </Menu.Item>
              ) : (
                ""
              )}
              {userInfo.group_role === 1 ? (
                <Menu.Item key="SuperAdminUser">
                  <span>Super Admin User</span>
                  <Link to="/super_admin_user"></Link>
                </Menu.Item>
              ) : (
                ""
              )}
              {userInfo.group_role === 1 ? (
                <Menu.Item key="SuperAdminCustomer">
                  <span>Super Admin Customer</span>
                  <Link to="/super_admin_customer"></Link>
                </Menu.Item>
              ) : (
                ""
              )}
            </Menu>
          </Col>
          <Col span={2}>
            <Dropdown
              overlay={<NotificationsCard data={lsNotification} />}
              onVisibleChange={(e) => fetchNotification()}
              overlayStyle={{ height: 400 }}
            >
              <Button className="btnNoti">
                <BellFilled style={{ fontSize: 20 }} />
                <span style={{ color: "#ff0000" }}>{countNoti}</span>
              </Button>
            </Dropdown>
          </Col>
          <Col span={2}>
            <Dropdown
              className="navbarUser"
              overlay={
                <Menu>
                  <Menu.Item>
                    <UserOutlined style={{ marginRight: "5px" }} />
                    <Link to={"/personal_information"}>
                      Xem thông tin tài khoản
                    </Link>
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
          <Col span={2}>
            <div className="toggleMenu">
              <BarChart className="toggleIcon" />
            </div>
          </Col>
        </Row>
      </Header>
    </div>
  );
}

export default Navbar;