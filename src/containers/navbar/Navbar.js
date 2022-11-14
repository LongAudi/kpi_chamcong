// import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Row, Col, Card, Dropdown, Button } from "antd";
import "./navbar.css";
import Logo from "../../images/LOGO ITIS.png";
import logoLogin from "../../images/logo ITIIS.png"
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
import { SurroundSoundTwoTone } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { BellFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import CloseIcon from '@mui/icons-material/Close';

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const cookies = new Cookies();

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // #################################
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

    // useEffect(() => {
    //   const toggleIcon = document.querySelector(".toggleMenu");
    //   toggleIcon.addEventListener("click", () => {
    //     document.querySelector(".menuNavbar").classList.toggle("active");
    //   });
    // }, []);

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
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          {/* <Link to="/" className="Logo1">
            <img src={Logo} alt="" style={{ height: "50px" }} />
          </Link> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
              <DrawerHeader >
                <img src={logoLogin} alt=""  className="imgLogoDrawer"/>
                <IconButton onClick={handleDrawerClose} className="IconButton_ChevronRightIcon">
                  {theme.direction === "rtl" ? (
                    <CloseIcon />
                  ) : (
                    <CloseIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {/* {["Inbox", "Starred", "Send email", "Drafts"].map(
                  (text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  )
                )} */}
                {userInfo.group_role === 1 ? (
                  <ListItem key="Admin" disablePadding>
                    <ListItemButton>
                      <Link to="/admin">Admin</Link>
                    </ListItemButton>
                  </ListItem>
                ) : (
                  ""
                )}
                <ListItem key="working_details" disablePadding>
                  <ListItemButton>
                    <Link to="/working_details">Working Details</Link>
                  </ListItemButton>
                </ListItem>
                {userInfo.group_role === 2 ? (
                  <ListItem key="Home" disablePadding>
                    <ListItemButton>
                      <Link to="/home">Home</Link>
                    </ListItemButton>
                  </ListItem>
                ) : (
                  ""
                )}
                {userInfo.group_role === 1 ? (
                  <ListItem key="project_management" disablePadding>
                    <ListItemButton>
                      <Link to="/project_management">Project Management</Link>
                    </ListItemButton>
                  </ListItem>
                ) : (
                  ""
                )}
                {userInfo.group_role === 1 ? (
                  <ListItem key="super_admin_user" disablePadding>
                    <ListItemButton>
                      <Link to="/super_admin_user">Super Admin User</Link>
                    </ListItemButton>
                  </ListItem>
                ) : (
                  ""
                )}
                {userInfo.group_role === 1 ? (
                  <ListItem key="super_admin_customer" disablePadding>
                    <ListItemButton>
                      <Link to="/super_admin_customer">Super Admin Customer</Link>
                    </ListItemButton>
                  </ListItem>
                ) : (
                  ""
                )}
              </List>
              <Divider />
            </Drawer>
          </Box>
          <Link to="/">
            <img src={Logo} alt="" style={{ height: "50px" }} />
          </Link>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {userInfo.group_role === 1 ? (
              <MenuItem sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/admin">Admin</Link>
              </MenuItem>
            ) : (
              ""
            )}
            {userInfo.group_role === 2 ? (
              <MenuItem
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/home">Home</Link>
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/working_details">Working Details</Link>
            </MenuItem>
            {userInfo.group_role === 1 ? (
              <MenuItem
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/project_management">Project Management</Link>
              </MenuItem>
            ) : (
              ""
            )}
            {userInfo.group_role === 1 ? (
              <MenuItem sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/super_admin_user">Super Admin User</Link>
              </MenuItem>
            ) : (
              ""
            )}
            {userInfo.group_role === 1 ? (
              <MenuItem
                key="SuperAdminCustomer"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/super_admin_customer">Super Admin Customer</Link>
              </MenuItem>
            ) : (
              ""
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
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
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem>
                <Typography textAlign="center">
                  <UserOutlined style={{ marginRight: "5px" }} />
                  <Link to={"/personal_information"}>
                    Xem thông tin tài khoản
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => logout_new()}>
                <Typography textAlign="center">
                  <LogoutOutlined style={{ marginRight: "5px" }} />
                  <a target="_blank" rel="noopener noreferrer">
                    Đăng xuất
                  </a>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
