import React, { useEffect, useState } from "react";
import {
  Table,
  Tooltip,
  // Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Tag,
  Drawer,
  TimePicker,
  Popconfirm,
} from "antd";
import { errorHandle, openNotificationWithIcon, toSlug } from "../Function";
import {
  GetListUserApi,
  GetRoleApi,
  GetUserEditApi,
  PostUserApi,
  PutLockUserApi,
  PutUserApi,
} from "../../api/usersApi";
import moment from "moment";
import {
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const { Option } = Select;
const validateMessages = {
  required: "Please enter your ${label} !",
  types: {
    email: "${label} is not in the correct email format!",
    number: "${label} not numbers!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const ModalAddUser = ({
  visible,
  onCancel,
  fetchData,
  pager,
  lsRole,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, []);

  const onFinish = (values) => {
    PostUserApi({
      username: values.username,
      email: values.email,
      last_name: values.last_name,
      first_name: values.first_name,
      group_role: values.group_role,
      birthday: values.birthday,
    })
      .then((res) => {
        if (res.data.error) {
          openNotificationWithIcon("error", res.data.error);
        } else {
          openNotificationWithIcon("success", "Success", "");
          fetchData({ page: pager.current, page_size: pager.pageSize });
          onCloseModal();
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

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  const onChangeFields = (event, field, intChoose) => {
    let valueTemp = event.target.value;
    switch (intChoose) {
      case 1:
        // console.log(1);
        if (
          event.target.value.charAt(event.target.value.length - 1) === "." ||
          event.target.value === "-"
        ) {
          valueTemp = event.target.value.slice(0, -1);
        }
        let newValue = toSlug(event.target.value);
        form.setFieldsValue({
          [field]: newValue,
          // username: valueTemp.replace(/\s+/, ''),
        });
        break;
      case 2:
        break;
      default:
      // code block
    }
  };

  return (
    <Modal
      title="ADD USER"
      visible={visible}
      onCancel={onCloseModal}
      className="modalAddUser"
      width={700}
      footer={false}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        loading={loading}
        initialValues={{
          remember: true,
        }}
      >
        <Row>
          <Col span={11}>
            <Form.Item
              name="username"
              label="UserName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="User"
                onChange={(e) => {
                  onChangeFields(e, "username", 1);
                }}
                // onBlur={(e) => {
                //   form.setFieldsValue({
                //     username: e.target.value.trim(),
                //   });
                // }}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input
                placeholder="Email"
                onBlur={(e) => {
                  form.setFieldsValue({ email: e.target.value.trim() });
                }}
                maxLength={100}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="last_name"
              label="Last name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                pattern="^[a-zA-Z0-9]*$"
                placeholder="Last name"
                onBlur={(e) => {
                  form.setFieldsValue({
                    last_name: e.target.value.trim(),
                  });
                }}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              name="first_name"
              label="First name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                pattern="^[a-zA-Z0-9]*$"
                placeholder="First name"
                onBlur={(e) => {
                  form.setFieldsValue({
                    first_name: e.target.value.trim(),
                  });
                }}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="group_role"
              label="Role"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select allowClear>
                {lsRole.map((item, index) => (
                  // console.log(item.id)
                  <Option key={item.name} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              name="birthday"
              label="Birthday"
              // rules={[
              //   {
              //     required: true,
              //   },
              // ]}
            >
              <DatePicker
                className="DateBirthdayUser"
                disabledDate={disabledDate}
                allowClear={false}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ marginTop: "20px", textAlign: "center" }}>
          <LoadingButton
            type="success"
            // htmlType="submit"
            className={"m-2"}
            style={{ marginRight: "20px" }}
            variant="contained"
          >
            Upload
          </LoadingButton>
          <Button onClick={onCloseModal} color="error" variant="contained">
            Exit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalEditUser = ({
  visible,
  onCancel,
  dataInforUser,
  pager,
  fetchData,
  lsRole,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (visible) {
      form.setFieldsValue({
        username: dataInforUser.username,
        email: dataInforUser.email,
        last_name: dataInforUser.last_name,
        first_name: dataInforUser.first_name,
        group_role: dataInforUser.group_role,
        birthday: dataInforUser.birthday,
      });
    }
  }, [visible]);

  const onFinish = (values) => {
    console.log(values);
    PutUserApi({
      username: values.username,
      email: values.email,
      last_name: values.last_name,
      first_name: values.first_name,
      group_role: values.group_role,
      birthday: values.birthday,
      block: false,
      userId: dataInforUser.id,
    })
      .then((res) => {
        if (res.data.error) {
          openNotificationWithIcon("error", res.data.error);
        } else {
          fetchData({ page: pager.current, page_size: pager.pageSize });
          openNotificationWithIcon("success", "Update success", "");
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
    <Modal
      title="EDIT USER"
      visible={visible}
      onCancel={onCloseModal}
      width={700}
      footer={false}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        loading={loading}
      >
        <Row>
          <Col span={11}>
            <Form.Item
              name="username"
              label="User Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="User" disabled></Input>
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input placeholder="User Name"></Input>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="first_name"
              label="First name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="First name"></Input>
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              name="last_name"
              label="Last name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Last name"></Input>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="group_role"
              label="Role"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select allowClear>
                {lsRole.map((item, index) => (
                  // console.log(item.id)
                  <Option key={item.name} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item name="birthday" label="Birthday">
              <Input placeholder="Birthday" disabled></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ marginTop: "20px", textAlign: "center" }}>
          <LoadingButton
            // htmlType="submit"
            type="success"
            className={"m-2"}
            style={{ marginRight: "20px" }}
            variant="contained"
          >
            Upload
          </LoadingButton>
          <Button onClick={onCloseModal} color="error" variant="contained">
            Exit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

function SuperAdminUser() {
  const defaultPageSize = 10;
  const [pager, setPager] = useState({
    pageSize: defaultPageSize,
    count: 0,
    current: 1,
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lsRole, setLsRole] = useState([]);
  const [dataInforUser, setDataInforUser] = useState([]);
  const [lsNameUser, setLsNameUser] = useState([]);

  const showModalAddUser = () => {
    setIsModalVisible(true);
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    GetListUserApi(params)
      .then((res) => {
        setData(res.data);
        setPager({
          current: params.page,
          pageSize: params.page_size,
          count: res.data.count,
        });
        setLoading(false);
      })
      .catch((err) => {
        errorHandle(err);
        setLoading(false);
      });
  };

  const fetchListChucVu = () => {
    GetRoleApi().then((res) => {
      // console.log(res);
      setLsRole(res.data);
    });
  };

  const fetchListUserName = () => {
    GetListUserApi().then((res) => {
      setLsNameUser(res.data);
    });
  };

  useEffect(() => {
    // console.log(1);
    fetchData({ page: pager.current, page_size: pager.pageSize, search });
    fetchListChucVu();
    fetchListUserName();
  }, []);

  const onShowModalEdit = (record) => {
    GetUserEditApi(record.id)
      .then((re) => {
        setDataInforUser(re.data);
        setIsEditing(true);
      })
      .catch((err) => {
        if (err.data.error) {
          openNotificationWithIcon("error", err.data.error);
        }
      });
  };

  const onLock_Unlock = (record) => {
    console.log(record.id);
    PutLockUserApi({
      userId: record.id,
      block: "true",
      is_active: !record.is_active,
    })
      .then((r) => {
        fetchData({ page: pager.current, page_size: pager.pageSize, search });
      })
      .catch((err) => {
        if (err.data.error) {
          openNotificationWithIcon("error", err.data.error);
        }
      });
  };

  const renderDetailsButton = (record) => {
    return (
      <Box sx={{ width: "100%" }}>
        <Grid container columns={12}>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          ></Grid>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <span
              title="Edit"
              className={"col-6"}
              style={{ color: "#4290d3", cursor: "pointer" }}
              onClick={() => onShowModalEdit(record)}
            >
              <EditOutlined />
            </span>
          </Grid>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {record.is_active === true ? (
              <span
                title={"Lock user"}
                className={"col-6"}
                style={{ color: "red", cursor: "pointer" }}
              >
                <Popconfirm
                  title="Confirmation key user"
                  onConfirm={() => onLock_Unlock(record)}
                  okText="Lock"
                >
                  <LockOutlined style={{ color: "#ff4d4f" }} />
                </Popconfirm>
              </span>
            ) : (
              <span
                title={"Unlock user"}
                className={"col-6"}
                style={{ color: "#008000", cursor: "pointer" }}
              >
                <Popconfirm
                  title="Unlock Confirmation user"
                  onConfirm={() => onLock_Unlock(record)}
                  okText="Unlock"
                >
                  <UnlockOutlined style={{ color: "#008000" }} />
                </Popconfirm>
              </span>
            )}
          </Grid>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          ></Grid>
        </Grid>
      </Box>
    );
  };

  const columns = [
    {
      field: "index",
      headerName: "ID",
      width: 100,
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    { field: "username", headerName: "UserName", width: 250, sortable: false },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 250,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
      sortable: false,
    },
    {
      field: "group_name",
      headerName: "Role",
      width: 150,
      sortable: false,
    },
    {
      field: "date_joined",
      headerName: "Date Join",
      width: 200,
      valueGetter: (value, record) =>
        value ? moment(value).format("DD/MM/YYYY") : "N/A",
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      // align: "center",
      headerAlign: "center",
      renderCell: renderDetailsButton,
      sortable: false,
    },
  ];

  const handleChange = (pagination) => {
    const currentPager = { ...pager };
    currentPager.current = pagination.current;
    currentPager.pageSize = pagination.pageSize;
    setPager({ ...currentPager });
    fetchData({
      status: currentPager.status,
      page_size: pagination.pageSize,
      page: pagination.current,
      search,
    });
  };
  return (
    <div className="FormHomeTable">
      <div className="FormProject1">
        <div className="FormHome2">
          <div className="HeaderContentUser">
            <Row style={{ width: "100%" }}>
              <Col span={12}>{/* <h1 className="h1UserTable"></h1> */}</Col>
              <Col span={12}>
                <Button className="btnAddUser" onClick={showModalAddUser}>
                <ControlPointIcon style={{marginRight: "5px"}}/> Add New
                </Button>
              </Col>
            </Row>
          </div>
          <div className="tableAdmin">
            <DataGrid
              loading={loading}
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              autoHeight={true}
              disableColumnMenu={true}
            />
          </div>
        </div>
      </div>
      <ModalAddUser
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        fetchData={fetchData}
        pager={pager}
        lsRole={lsRole}
        loading={loading}
      />
      <ModalEditUser
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        dataInforUser={dataInforUser}
        pager={pager}
        fetchData={fetchData}
        lsRole={lsRole}
        loading={loading}
      />
    </div>
  );
}

export default SuperAdminUser;
