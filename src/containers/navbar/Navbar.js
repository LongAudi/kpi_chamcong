import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Row, Avatar, Layout, Col, Button } from "antd";
import "./navbar.css";
import { UserOutlined, LogoutOutlined, BellFilled } from "@ant-design/icons";
import Logo from "../../images/VBPO_Logo.png";
import { authAxios } from "../../api/axiosClient";
import { logout } from "../../app/Actions/auth";
import { logoutURL, ListNotification, ReadAllNotificationURL, ReadNotification } from "../../constants";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getPushNotification} from "../Function";

const { Header } = Layout;

const cookies = new Cookies();

function Navbar() {
  const userInfo = useSelector((state) => state.getUserInfo.userInfo);

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

  // const fetchNotification = () => {
  //   authAxios(cookies.get('token'))
  //       .get(ListNotification)
  //       .then(res => {
  //           this.setState({
  //               lsNotification: res.data,
  //               countNoti: res.data.filter(item => item.is_view == false).length
  //           })
  //       })
  //       .catch(err => {
  //           this.setState({error: err, loading: false});
  //       });
  // };

  // useEffect(() => {
  //   fetchNotification();
  //   try {
  //       setInterval(async () => {
  //           fetchNotification()
  //           getPushNotification()
  //               .then(res =>{
  //                   // console.log(res.data)
  //                   if (res.data.length > 0) {
  //                       const notiData = res.data[0]
  //                       const notification = new Notification("STAFF", {
  //                         body : notiData.content,
  //                         icon : './VBPO_Logo.png'
  //                       });
  //                     // notification.onclick = function() {
  //                     //   window.location.href = '/tickets/' + notiData.ticket_rel_id
  //                     // };
  //                   }
  //               })
  //       }, 300000);
  //     } catch(e) {
  //       console.log(e);
  //     }
  // }, []);

//   const NotificationsCard = (data) => {
//     const [currentKey,setCurrentKey] = useState('tab1')
//     const onTabChange = (key) => {
//         setCurrentKey(key)
//     };
//     const tabList = [
//         {
//             key: 'tab1',
//             tab: 'Mới',
//         },
//         {
//             key: 'tab2',
//             tab: 'Tất cả',
//         },
//     ];
//     const ReadAllNotification = () => {
//         authAxios(cookies.get('token'))
//             .post(ReadAllNotificationURL)
//             .then(res => {
//                 this.fetchNotification()
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     };
//     const ReadNotificationFn = (notiId, ticketId) => {
//         authAxios(cookies.get('token'))
//             .post(ReadNotification, {notification_id: notiId})
//             .then(res => {
//                 // this.fetchNotification()
//                 window.location.href = "/tickets/" + ticketId
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     };
//     const NotiNew = (listNotification) => {
//         return (
//             <>
//                 {listNotification.map((item,index) => (
//                     <Row style={{textAlign: 'center'}} key={item.id +"_" + index + item.ticket_rel}
//                          style={{backgroundColor: '#ffffff', marginBottom: 5}}>
//                         <Col sm={6}>
//                             <span>{moment(item.created).format('L')}</span>
//                         </Col>
//                         <Col sm={18}>
//                             {item.is_view ?
//                                 <a style={{color: '#e0e0e0'}}
//                                    onClick={e => ReadNotificationFn(item.id, item.ticket_rel)}>{item.content}</a>
//                                 :
//                                 <a onClick={e => ReadNotificationFn(item.id, item.ticket_rel)}>{item.content}</a>}
//                         </Col>
//                     </Row>
//                 ))}
//             </>)

//     }
//     const NotiBlank = () => {
//         return (
//             <Row>
//                 <Col sm={14} offset={5}>
//                     <h3 style={{fontSize:30,textAlign:'center'}}><SoundTwoTone /></h3>
//                     <h3 style={{textAlign:'center'}}>Bạn đã xem hết thông báo</h3>
//                 </Col>
//             </Row>
//         )
//     }
//     const contentList = {
//         tab1: data.data.filter(item => !item.is_view).length > 0 ? NotiNew(data.data.filter(item => !item.is_view)) : NotiBlank(),
//         tab2: NotiNew(data.data)
//     }
//     const hasReadAll = data.data.filter(item => !item.is_view).length > 0 ?
//         <a type={'primary'} onClick={e => ReadAllNotification()}>Đánh dấu đã đọc</a> : ''
//     return (
//         <>
//             <Col span={22}>
//             <Card
//                 className={'notification-card'}
//                 style={{width: '400px', height: '500px'}}
//                 title="Thông báo"
//                 extra={hasReadAll}
//                 tabList={tabList}
//                 activeTabKey={currentKey}
//                 onTabChange={key => {
//                     onTabChange(key);
//                 }}
//             >
//                 {contentList[currentKey]}
//             </Card>
//             </Col>
//         </>)
// }

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
          {userInfo.group_role == 1 ? 
            <Menu.Item key="Admin">
              <span>Admin</span>
              <Link to="/admin"></Link>
            </Menu.Item>
            : ""}
          {userInfo.group_role == 3 ? 
            <Menu.Item key="WorkingDetails">
              <span>Working Details</span>
              <Link to="/working_details"></Link>
            </Menu.Item>
            : ""}
            {/* <Menu.Item key="notification" style={{padding: "0px"}} >
                <Dropdown overlay={<this.NotificationsCard data={this.state.lsNotification}/>}
                        onVisibleChange={e => this.fetchNotification()} style={{height: 400}}>
                    <Button style={{border: 'none', background: 'none', boxShadow: 'none'}}>
                        <BellFilled style={{fontSize: 16}}/>
                        <span style={{color: '#ff0000'}}>{this.state.countNoti}</span>
                    </Button>
                </Dropdown>
            </Menu.Item> */}
          </Menu>
        </Col>
        <Col span={2} >
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
