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
} from "antd";
import { errorHandle, openNotificationWithIcon } from "../Function";
import {
  GetListUserApi,
  GetRoleApi,
  GetUserEditApi,
  PostUserApi,
  PutUserApi,
} from "../../api/usersApi";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Option } = Select;
const validateMessages = {
  required: "Please enter your registered ${label} !",
  types: {
    email: "${label} is not in the correct email format!",
    number: "${label} not numbers!",
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
    })
      .then((res) => {
        if (res.data.error) {
          openNotificationWithIcon("error", res.data.error);
        } else {
          openNotificationWithIcon("success", "Thành công", "");
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
    return current && current > moment().startOf("day");
  };

  return (
    <Modal
      title="ADD USER"
      visible={visible}
      onCancel={onCloseModal}
      className="modalAddUser"
      width={1000}
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
        <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
          <Button type="success" htmlType="submit" className={"m-2"}>
            Thêm
          </Button>
          <Button onClick={onCloseModal}>Thoát</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalAddProject = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Project",
      dataIndex: "Project",
      key: "Project",
    },
    {
      title: "Shifts Working",
      dataIndex: "working_time",
      key: "working_time",
    },
  ];

  const onCloseModal = () => {
    form.resetFields();
    onCancel();
  };

  const data = [
    {
      key: "1",
      Project: "John Brown",
      working_time: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onCancel={onCloseModal}
      width={1000}
    >
      <Table columns={columns} dataSource={data} />
    </Modal>
  );
};

const ModalEditUser = ({
  visible,
  onCancel,
  dataInforUser,
  pager,
  fetchData,
  lsRole
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
    PutUserApi({
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
      width={1000}
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
            <Form.Item
              name="birthday"
              label="Birthday"
            >
              <Input placeholder="Birthday" disabled></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
          <Button type="success" htmlType="submit" className={"m-2"}>
            Thêm
          </Button>
          <Button onClick={onCloseModal}>Thoát</Button>
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
  const [isShowAddProject, setIsShowAddProject] = useState(false);
  const [dataInforUser, setDataInforUser] = useState([]);

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

  useEffect(() => {
    // console.log(1);
    fetchData({ page: pager.current, page_size: pager.pageSize, search });
    fetchListChucVu();
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      filterKey: "id",
      align: "center",
      render: (value, item, index) =>
        ((pager.current || 1) - 1) * pager.pageSize + index + 1,
      sortDirections: ["descend", "ascend", "descend"],
      ellipsis: true,
      width: 90,
    },
    {
      title: "UserName",
      dataIndex: "username",
      key: "username",
      filterKey: "username",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
    },
    {
      title: "Full Name",
      dataIndex: "last_name",
      key: "last_name",
      filterKey: "last_name",
      align: "center",
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
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "group_role",
      key: "group_role",
      filterKey: "group_role",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
      render: (tags) => {
        if (tags == "1") {
          return "Leader";
        }
        if (tags == "2") {
          return "Member";
        }
      },
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
        <div
          className="btngroup1"
          style={{ display: "flex", marginLeft: "55px" }}
        >
          <div className="btnBack" style={{ marginRight: "10px" }}>
            <Tooltip placement="bottom" title="Sửa" arrowPointAtCenter>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => {
                  onShowModalEdit(record);
                }}
              />
            </Tooltip>
          </div>
          {/* <div className='btnDelete' style={{ marginRight: "10px" }}>
            <Tooltip placement="bottom" title="Xóa" arrowPointAtCenter>
              <Button type="primary" shape="circle" icon={<DeleteOutlined />}
                onClick={() => {
                  onDeleteNhan(record);
                }}
              />
            </Tooltip>
          </div> */}
        </div>
      ),
    },
  ];

  // const listRole = [
  //   { value: "1", name: "Leader" },
  //   { value: "2", name: "Member" },
  // ];

  return (
    <div className="formUser">
      <div className="formUser1">
        <div className="formUser2">
          <div className="HeaderContentUser">
            <Row style={{ width: "100%" }}>
              <Col span={12}>
                <h1 className="h1UserTable">USER</h1>
              </Col>
              <Col span={12}>
                <Button
                  className="btnAddUser"
                  type="primary"
                  onClick={showModalAddUser}
                >
                  Add User
                </Button>
                <Button
                  className="btnAddUser"
                  type="primary"
                  onClick={() => setIsShowAddProject(true)}
                >
                  Add Project
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
      <ModalAddProject
        visible={isShowAddProject}
        onCancel={() => setIsShowAddProject(false)}
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
