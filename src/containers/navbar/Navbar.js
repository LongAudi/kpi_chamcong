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
import { ListItemButton, ListItemText  } from '@mui/material';

import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Row, Col, Card, Dropdown, Button } from "antd";
import "./navbar.css";
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
import { SurroundSoundTwoTone } from "@mui/icons-material";
import { Badge, Drawer } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { BellFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import StoreIcon from "@mui/icons-material/Store";
import EmailIcon from "@mui/icons-material/Email";

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

function notificationsLabel(count) {
  if (count === 0) {
    return "no notifications";
  }
  if (count > 99) {
    return "more than 99 notifications";
  }
  return `${count} notifications`;
}

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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
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
        tab: "New",
      },
      {
        key: "tab2",
        tab: "All",
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
          Mark as read
        </a>
      ) : (
        ""
      );

    return (
      <>
        <Col span={22}>
          <Card
            className={"notification-card"}
            style={{ width: "360px", height: "410px", borderRadius: "20px" }}
            // onScroll="true"
            title="Notification"
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

  const [selectedIndex, setSelectedIndex] = useState("");
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const SidebarData = [
    {
      id: 1,
      group_role: 1,
      link: "/admin",
      name: "Admin",
      icon: <PeopleOutlinedIcon />,
    },
    {
      id: 2,
      group_role: 2,
      link: "/",
      name: "Home",
      icon: <HomeIcon />,
    },
    {
      id: 3,
      group_role: 2,
      link: "/working_details",
      name: "Working Details",
      icon: <AutoAwesomeMotionIcon />,
    },
    {
      id: 4,
      group_role: 1,
      link: "/project_management",
      name: "Project Management",
      icon: <ReceiptOutlinedIcon />,
    },
    {
      id: 5,
      group_role: 3,
      link: "/super_admin_user",
      name: "Super Admin User",
      icon: <PeopleOutlinedIcon />,
    },
    {
      id: 6,
      group_role: 3,
      link: "/super_admin_customer",
      name: "Super Admin Customer",
      icon: <StoreIcon />,
    },
    {
      id: 7,
      group_role: 1,
      link: "/working_details",
      name: "Working Details",
      icon: <AutoAwesomeMotionIcon />,
    },
    {
      id: 8,
      group_role: 1,
      link: "/mail",
      name: "Mail",
      icon: <EmailIcon />,
    },
    {
      id: 9,
      group_role: 1,
      link: "/invoice_package",
      name: "Invoice package",
      icon: <EmailIcon />,
    },
  ];

  

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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

          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            role="presentation"
          >
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
              <DrawerHeader>
                {/* <img src={logoLogin} alt="" className="imgLogoDrawer" /> */}
                <IconButton
                  onClick={handleDrawerClose}
                  className="IconButton_ChevronRightIcon"
                >
                  {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />

              {SidebarData.filter(
                (value) => value.group_role === userInfo.group_role
              ).map((option, index) => (
                // console.log(option)
                <Link to={option.link} onClick={handleDrawerClose}>
                  <MenuItem
                    key={option.id}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                    sx={{ color: "white", display: "block" }}
                  >
                    <IconButton size="large" color="inherit">
                      {option.icon}
                    </IconButton>
                    {option.name}
                  </MenuItem>
                </Link>
              ))}
              <Divider />
            </Drawer>
          </Box>
          <Link to="/">
            <img src={Logo} alt="" className="logoNavbar" />
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
            {/* menu chinh */}

             
            {/* <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse> */}

            {SidebarData.filter(
              (value) => value.group_role === userInfo.group_role
            ).map((option, index) => (
              <Link to={option.link}>
                <MenuItem
                  key={option.id}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                  sx={{ color: "white", display: "block" }}
                  className="MenuItemFontSize"
                >
                  <IconButton size="small" color="inherit">
                    {option.icon}
                  </IconButton>
                  {option.name}
                
                </MenuItem>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0.05 }} style={{ alignItems: "center" }}>
            <Dropdown
              overlay={<NotificationsCard data={lsNotification} />}
              onVisibleChange={(e) => fetchNotification()}
              overlayStyle={{ height: 400 }}
            >
              {/* <Button className="btnNoti">
                <BellFilled style={{ fontSize: 20 }} />
                <span style={{ color: "#ff0000" }}>{countNoti}</span>
              </Button> */}
              <IconButton aria-label={notificationsLabel(100)}>
                <Badge badgeContent={countNoti} color="error">
                  <BellFilled />
                </Badge>
              </IconButton>
            </Dropdown>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={userInfo.username}
                  src="/static/images/avatar/2.jpg"
                />
                {/* <span style={{color: "#fff", fontSize: "15px", marginLeft: "5px"}}>{userInfo.username}</span> */}
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
              key="Menu"
            >
              <MenuItem key="UserOutlined">
                <Typography textAlign="center">
                  <UserOutlined />
                  <Link
                    to={"/personal_information"}
                    style={{ marginLeft: "5px" }}
                  >
                    See all profiles
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem key="LogoutOutlined" onClick={() => logout_new()}>
                <Typography textAlign="center">
                  <LogoutOutlined />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "5px" }}
                  >
                    Log Out
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
