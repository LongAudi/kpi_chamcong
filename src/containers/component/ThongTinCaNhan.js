import {
  Alert,
  Col,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Modal,
  Row
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  PutChangePassApi,
  PutInfoApi,
  UserInfoUrlApi
} from "../../api/usersApi";
import {
  CardContent,
  CardHeader,
  Container,
  Paper,
  Typography,
  Button,
  Avatar,
  Card,
  Box,
  Grid,
  Tab,
  Badge,
  styled,
  CardMedia
} from "@mui/material";
import { AccountCircle, Inbox, Mail, Settings } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { errorHandle, openNotificationWithIcon } from "../Function";
import { useParams } from "react-router";
import { authAxios } from "../../api/axiosClient";
import Cookies from "universal-cookie";
import { logout } from "../../app/Actions/auth";
import { logoutURL } from "../../constants";
import { useSelector } from "react-redux";

function dateFormat(inputDate) {
  if (inputDate == null) {
    return "";
  } else if (inputDate != null) {
    return moment(inputDate).format("DD-MM-YYYY");
  }
}
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}));
const validateMessages = {
  required: "Please enter your ${label} !",
  types: {
    email: "${label} không đúng định dạng email!",
    number: "${label} không phải số!"
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  }
};

const cookies = new Cookies();
export default function ThongTinCaNhan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = (params = {}) => {
    UserInfoUrlApi(params)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        errorHandle(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData({});
  }, []);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };

  // function checkName() {
  //   if (data.last_name == null && data.first_name == null) {
  //     return "";
  //   } else if (data.last_name != null && data.first_name != null) {
  //     return data.last_name + " " + data.first_name;
  //   }
  // }
  const [isShowEditStaff, setIsShowEditStaff] = useState(false);
  const [dataInforUser, setDataInforUser] = useState([]);

  const onShowFormEdit = (params = {}) => {
    UserInfoUrlApi(params)
      .then((re) => {
        setDataInforUser(re.data);
        setIsShowEditStaff(true);
        // setIsEditing(true);
      })
      .catch((err) => {
        if (err.data.error) {
          openNotificationWithIcon("error", err.data.error);
        }
      });
  };
  const FormEditUser = ({
    initialValues,
    onCancel,
    dataInforUser,
    fetchData
  }) => {
    const [form] = Form.useForm();
    useEffect(() => {
      form.resetFields();
      if (form) {
        form.setFieldsValue({
          username: dataInforUser.username,
          email: dataInforUser.email,
          last_name: dataInforUser.last_name,
          first_name: dataInforUser.first_name,
          birthday: dataInforUser.birthday
        });
      }
    }, [
      form
      // ,
      // dataInforUser.birthday,
      // dataInforUser.email,
      // dataInforUser.first_name,
      // dataInforUser.last_name,
      // dataInforUser.username
    ]);

    const onFinish = (values) => {
      PutInfoApi({
        username: values.username,
        email: values.email,
        last_name: values.last_name,
        first_name: values.first_name,
        birthday: values.birthday,
        block: false
      })
        .then((res) => {
          if (res.data.error) {
            openNotificationWithIcon("error", res.data.error);
          } else {
            fetchData({});
            onCancel();
            form.resetFields();
          }
        })
        .catch((err) => {
          if (err.data.error) {
            openNotificationWithIcon("error", err.data.error);
          }
        });
    };

    const onFinishFailed = (errorInfo) => {
      // console.log("Failed:", errorInfo);
    };

    const onCloseModal = () => {
      form.resetFields();
      onCancel();
    };

    return (
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Card>
          <CardContent>
            <Form.Item
              name="username"
              label="User Name"
              style={{ paddingTop: "-8px" }}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input placeholder="" readOnly></Input>
            </Form.Item>
            <Form.Item
              name="first_name"
              label="First Name"
              style={{ paddingTop: "8px" }}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Last Name"
              style={{ paddingTop: "8px" }}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              style={{ paddingTop: "8px" }}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input></Input>
            </Form.Item>
          </CardContent>
        </Card>
        <Form.Item>
          <Grid item xs={12}>
            <Grid container spacing-xs={3} columns={12} sx={{}}>
              <Grid
                xs={12}
                lg={6}
                sx={{
                  marginTop: "12px",
                  paddingLeft: "8px",
                  paddingRight: "8px"
                }}
              >
                <Button type="submit" color="success" variant="contained">
                  Update Profile
                </Button>
              </Grid>
              <Grid
                xs={12}
                lg={4}
                sx={{
                  marginTop: "12px",
                  paddingLeft: "8px",
                  paddingRight: "8px"
                }}
              >
                <Button
                  onClick={onCloseModal}
                  color="error"
                  variant="contained"
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form.Item>
      </Form>
    );
  };
  //change password
  const userInfo = useSelector((state) => state.getUserInfo.userInfo);
  const [modalVisiblePass, setModalVisiblePass] = useState(false);
  // const [loading, setLoading] = useState(false);
  const logout_new = (e) => {
    authAxios()
      .get(logoutURL)
      .then((res) => {
        cookies.remove("token");
        cookies.remove("refresh");

        window.location = "/login";
      });

    logout();
  };
  const fetchApiChangePass = (params = {}) => {
    setLoading(true);
    PutChangePassApi(userInfo.id, {
      password: params.pass_new2
    })
      .then((res) => {
        if (res.data.error) {
          const dataError = Object.entries(res.data.error).map(
            ([key, value]) => value
          );
          openNotificationWithIcon("error", "Lỗi", dataError);
          setModalVisiblePass(false);
        } else {
          openNotificationWithIcon(
            "success",
            "Thông báo",
            "Đổi mật khẩu thành công."
          );
          setModalVisiblePass(true);
          logout_new();
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishChangePass = (values) => {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()])[A-Za-z\d~`!@#$%^&*()]{9,}$/.test(
        values.passNew_1
      ) == false
    ) {
      openNotificationWithIcon("error", "Lỗi", "Mật khẩu không hợp lệ.");
      return;
    } else {
      setLoading(true);
      fetchApiChangePass({
        pass_new2: values.passNew_2
      });
    }
  };

  const handleModalCancel_1 = () => {
    setModalVisiblePass(false);
  };
  const ChangePassword = (modalVisiblePass) => {
    return (
      <Container
        // destroyOnClose
        // title="Đổi mật khẩu"
        // visible={modalVisiblePass}
        // onCancel={handleModalCancel_1}
        // footer={null}/
        // closeIcon={<CloseCircleOutlined title="Thoát (ESC)" />}
        // keyboard // press esc to close
        // width={600}
      >
        <Form
          onFinish={(values) => onFinishChangePass(values)}
          validateMessages={validateMessages}
          layout="vertical"
        >
          <Col sm={13} offset={4}>
            <Form.Item
              name="passOLD"
              rules={[
                {
                  required: true
                }
              ]}
              label={"Nhập mật khẩu cũ"}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col sm={13} offset={4}>
            <Form.Item
              name="passNew_1"
              rules={[
                {
                  required: true
                }
              ]}
              label={"Nhập mật khẩu mới"}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col sm={13} offset={4}>
            <Form.Item
              name="passNew_2"
              label={"Nhập lại mật khẩu mới"}
              dependencies={["passNew_1"]}
              hasFeedback
              rules={[
                {
                  required: true
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("passNew_1") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Hai mật khẩu bạn đã nhập không khớp!")
                    );
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Row style={{ paddingBottom: "5px" }}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button
                shape="round"
                size="default"
                type="primary"
                htmlType="submit"
              >
                Đổi mật khẩu
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          <Alert
            message="Lưu ý: "
            description="Mật khẩu phải ít nhất 9 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
            type="warning"
            showIcon
          />
        </Row>
      </Container>
    );
  };
  const ChangePasswordA = () => {
    return (
      <Card>
        <CardHeader title="Change Password" />
        <CardContent>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
          >
            <Form.Item label="Old Password" style={{ paddingTop: "8px" }}>
              <Input />
            </Form.Item>
            <Form.Item label="New Password" style={{ paddingTop: "8px" }}>
              <Input />
            </Form.Item>
            <Form.Item label="ReNew Password" style={{ paddingTop: "8px" }}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Grid item xs={12}>
                <Grid container spacing-xs={3} columns={12} sx={{}}>
                  <Grid
                    xs={12}
                    lg={3}
                    sx={{
                      marginTop: "12px",
                      paddingLeft: "8px",
                      paddingRight: "8px"
                    }}
                  >
                    <Button type="submit" color="success" variant="contained">
                      Update Profile
                    </Button>
                  </Grid>
                  <Grid
                    xs={12}
                    lg={4}
                    sx={{
                      marginTop: "12px",
                      paddingLeft: "8px",
                      paddingRight: "8px"
                    }}
                  >
                    <Button color="error" variant="contained">
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form.Item>
          </Form>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "24px" }}>
      <Paper elevation={24} sx={{ borderRadius: "30px" }}>
        <CardContent>
          <Grid container spacing-xs={3}>
            <Grid item xs={12}>
              <TabContext value={value.toString()}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label="ProFile"
                      value="1"
                      icon={<AccountCircle />}
                      iconPosition="start"
                    />
                    {/* <Tab
                      label="Change Password"
                      // disabled
                      value="2"
                      icon={<Settings />}
                      iconPosition="start"
                    /> */}
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box>
                    <Grid container spacing-xs={3} columns={12} sx={{}}>
                      <Grid
                        xs={12}
                        lg={4}
                        sx={{
                          marginTop: "12px",
                          paddingLeft: "12px",
                          paddingRight: "12px"
                        }}
                      >
                        <Card>
                          <CardMedia
                            component="img"
                            height="168px"
                            image="https://cdna.artstation.com/p/assets/images/images/038/454/888/large/angrycomputer-studios-6-2.jpg?1623149874"
                            alt="green iguana"
                          />
                          <CardHeader
                            avatar={
                              <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right"
                                }}
                                variant="dot"
                              >
                                <Avatar
                                  sx={{ width: 48, height: 48 }}
                                  aria-label="recipe"
                                ></Avatar>
                              </StyledBadge>
                            }
                            title={data.last_name + " " + data.first_name}
                            subheader={data.group_name}
                          />
                        </Card>
                      </Grid>
                      <Grid
                        xs={12}
                        lg={8}
                        sx={{
                          marginTop: "12px",
                          paddingLeft: "12px",
                          paddingRight: "12px"
                        }}
                      >
                        <Grid xs={12}>
                          <Card>
                            <CardHeader
                              title={<Typography>Personal Details</Typography>}
                            />
                            {isShowEditStaff && (
                              <CardContent>
                                <FormEditUser
                                  onCancel={() => setIsShowEditStaff(false)}
                                  fetchData={fetchData}
                                  dataInforUser={dataInforUser}
                                />
                              </CardContent>
                            )}

                            {!isShowEditStaff && (
                              <>
                                <CardContent>
                                  <Card>
                                    <CardContent>
                                      <Descriptions column={1}>
                                        <Descriptions.Item
                                          label="Username"
                                          key="username"
                                          dataIndex="username"
                                        >
                                          {data.username}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Full Name">
                                          {data.last_name +
                                            " " +
                                            data.first_name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Email">
                                          {data.email}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="BirthDay">
                                          {dateFormat(data.birthday)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Date Join">
                                          {dateFormat(data.date_joined)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Academic Level">
                                          {data.academic_level}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Current Salary">
                                          {data.currrent_salary}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Customer">
                                          {data.data_customer && data.data_customer[0].name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Role">
                                          {data.group_name}
                                        </Descriptions.Item>
                                      </Descriptions>
                                    </CardContent>
                                  </Card>
                                  <Grid
                                    xs={12}
                                    lg={4}
                                    sx={{
                                      marginTop: "12px",
                                      paddingLeft: "8px",
                                      paddingRight: "8px"
                                    }}
                                  >
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        // setIsShowEditStaff(!isShowEditStaff);
                                        onShowFormEdit();
                                      }}
                                    >
                                      Editing Profile
                                    </Button>
                                  </Grid>
                                </CardContent>
                              </>
                            )}
                          </Card>
                        </Grid>
                        <Grid container spacing-xs={2} columns={12}>
                          <Grid
                            xs={12}
                            lg={12}
                            sx={{
                              marginTop: "12px",
                              paddingLeft: "12px"
                            }}
                          ></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <ChangePassword />
                </TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </Container>
  );
}
