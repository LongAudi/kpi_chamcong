import React, { useEffect, useState } from "react";
import {
  Table,
  Tooltip,
  Button,
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
import { errorHandle, openNotificationWithIcon } from "../Function";
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

const { Option } = Select;
const validateMessages = {
  required: "Please enter your ${label} !",
  types: {
    email: "${label} is not in the correct email format!",
    number: "${label} not numbers!",
    string: "${label} not Chữ!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const ModalAddUser = ({ visible, onCancel, fetchData, pager, lsRole }) => {
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
    })
      .then((res) => {
        if (res.data.error) {
          openNotificationWithIcon("error", res.data.error);
        } else {
          openNotificationWithIcon("success", "success", "");
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
                onBlur={(e) => {
                  form.setFieldsValue({
                    username: e.target.value.trim(),
                  });
                }}
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
          <Button
            type="success"
            htmlType="submit"
            className={"m-2"}
            style={{ marginRight: "20px" }}
          >
            Upload
          </Button>
          <Button onClick={onCloseModal}>Exit</Button>
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
    PutUserApi(dataInforUser.id, {
      username: values.username,
      email: values.email,
      last_name: values.last_name,
      first_name: values.first_name,
      group_role: values.group_role,
      birthday: values.birthday,
      block: false,
    })
      .then((res) => {
        if (res.data.error) {
          openNotificationWithIcon("error", res.data.error);
        } else {
          fetchData({ page: pager.current, page_size: pager.pageSize });
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
          <Button
            type="success"
            htmlType="submit"
            className={"m-2"}
            style={{ marginRight: "20px" }}
          >
            Upload
          </Button>
          <Button onClick={onCloseModal}>Exit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

function User() {
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
    console.log(record.userId);
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

  const columns = [
    {
      title: "ID",
      dataIndex: "index",
      key: "index",
      filterKey: "index",
      // align: "center",
      render: (value, item, index) =>
        ((pager.current || 1) - 1) * pager.pageSize + index + 1,
      sortDirections: ["descend", "ascend", "descend"],
      ellipsis: true,
      width: 50,
    },
    {
      title: "UserName",
      dataIndex: "username",
      key: "username",
      filterKey: "username",
      // align: "center",
      type: "text",
      canSearch: true,
      width: 100,
    },
    {
      title: "Full Name",
      dataIndex: "last_name",
      key: "last_name",
      filterKey: "last_name",
      // align: "center",
      type: "text",
      canSearch: true,
      width: 150,
      render: (text, record) => (
        <span>
          {record.first_name
            ? record.last_name + "  " + record.first_name
            : record.last_name}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filterKey: "email",
      // align: "center",
      type: "text",
      canSearch: true,
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "group_name",
      key: "group_name",
      filterKey: "group_name",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
    },
    {
      title: "Date Join",
      dataIndex: "date_joined",
      key: "date_joined",
      filterKey: "date_joined",
      width: 120,
      align: "center",
      type: "text",
      canSearch: true,
      render: (value, record) =>
        value ? moment(value).format("DD/MM/YYYY") : "N/A",
    },
    {
      title: "Action",
      key: "Action",
      filterKey: "Action",
      fixed: "right",
      align: "center",
      width: 100,
      render: (record) => (
        <Row>
          <Col span={6}></Col>
          <Col span={4}>
            <span
              title="Edit"
              className={"col-6"}
              style={{ color: "#4290d3", cursor: "pointer" }}
              onClick={() => onShowModalEdit(record)}
            >
              <EditOutlined />
            </span>
          </Col>
          <Col span={4}></Col>
          <Col span={4}>
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
          </Col>
          <Col span={6}></Col>
        </Row>
      ),
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
      <div className="FormHome1">
        <div className="FormHome2">
          <div className="HeaderContentUser">
            <Row style={{ width: "100%" }}>
              <Col span={12}>{/* <h1 className="h1UserTable"></h1> */}</Col>
              <Col span={12}>
                <Button
                  className="btnAddUser"
                  type="primary"
                  onClick={showModalAddUser}
                >
                  Add User
                </Button>
              </Col>
            </Row>
          </div>

          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            size="middle"
            loading={loading}
            scroll={{ x: 500 }}
            onChange={handleChange}
            // className="tableUser"
            pagination={{
              current: pager.current,
              pageSize: pager.pageSize,
              total: data.count,
              showSizeChanger: true,
              pageSizeOptions: ["10", "15", "25", "50"],
            }}
          />
        </div>
      </div>
      <ModalAddUser
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        fetchData={fetchData}
        pager={pager}
        lsRole={lsRole}
      />
      <ModalEditUser
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        dataInforUser={dataInforUser}
        pager={pager}
        fetchData={fetchData}
        lsRole={lsRole}
      />
    </div>
  );
}

export default User;
