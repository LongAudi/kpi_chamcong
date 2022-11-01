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
import {
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { GetProjectApi } from "../../api/projectApi";

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
      group_role: values.group_role,
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

const ModalAddProject = ({ visible, onCancel, dataInforUser,lsNameUser }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const defaultPageSize = 10;
  const [pager, setPager] = useState({
    pageSize: defaultPageSize,
    count: 0,
    current: 1,
  });

  const fetchDataProject = (params = {}) => {
    setLoading(true);
    GetProjectApi(params)
      .then((res) => {
        console.log(res.data);
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

  useEffect(() => {
    fetchDataProject();
  }, []);

  const columns = [
    {
      title: "Project",
      dataIndex: "name",
      key: "name",
      filterKey: "name",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
    },
    {
      title: "Number of members",
      dataIndex: "Number_of_members",
      key: "Number_of_members",
      filterKey: "Number_of_members",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      filterKey: "Action",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
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
                  showDrawer(record);
                }}
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onCloseModal = () => {
    form.resetFields();
    onCancel();
  };

  const CardTaoTeam = () => {
    const [form] = Form.useForm();
    const [size, setSize] = useState("middle");
    const [timeStart, setTimeStart] = useState(null);
    const [timeEnd, setTimeEnd] = useState(null);

    // const children = [];
    // for (let i = 10; i < 36; i++) {
    //   children.push(
    //     <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    //   );
    // }

    // const getDisableHourOut = () => {
    //   const timeIn = timeStart ? timeStart._d.getHours() : 0;
    //   let arrCheck = [...Array(24).keys()];
    //   return arrCheck.filter((item) => item < timeIn);
    // };
    // const getDisableHourIn = () => {
    //   const timeIn = timeEnd ? timeEnd._d.getHours() : 24;
    //   let arrCheck = [...Array(24).keys()];
    //   return arrCheck.filter((item) => item > timeIn);
    // };

    return (
      <>
        <Form
          form={form}
          name="basic"
          layout={"vertical"}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Row>
            <Col span={24}>
              <Form.Item label="Project Name" rules={[{ required: true }]}>
                <Input maxLength={100} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Working shift" rules={[{ required: true }]}>
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item
                label="Time in"
                name="gioVao"
                rules={[{ required: true }]}
              >
                <TimePicker
                  format="HH:mm"
                  placeholder={"Time in"}
                  // onSelect={(value) => onSelectTimeStart(value)}
                  value={timeStart}
                  style={{ width: "100%" }}
                  minuteStep={15}
                  allowClear={false}
                  // disabledHours={getDisableHourIn}
                />
              </Form.Item>
            </Col>
            <Col span={4}></Col>
            <Col span={10}>
              <Form.Item
                label="Time out"
                name="gioRa"
                rules={[{ required: true }]}
              >
                <TimePicker
                  format="HH:mm"
                  placeholder={"Time out"}
                  // onSelect={(value) => onSelectTimeEnd(value)}
                  value={timeEnd}
                  style={{ width: "100%" }}
                  minuteStep={15}
                  // disabledHours={getDisableHourOut}
                  allowClear={false}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Name Member">
                <Select
                  mode="multiple"
                  placeholder="Please select"
                  size={size}
                  style={{
                    width: "100%",
                  }}
                  allowClear
                >
                  {/* {children} */}
                  {lsNameUser.map((item, index) => (
                    // console.log(item.id)
                    <Option key={item.name} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            // wrapperCol={{ offset: 6, span: 12 }}
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <Button
              type="success"
              htmlType="submit"
              style={{ marginRight: "20px" }}
              className={"m-2"}
            >
              Add new
            </Button>
            <Button onClick={onClose}>Exit</Button>
          </Form.Item>
        </Form>
      </>
    );
  };

  return (
    <Modal
      title="Add time working"
      visible={visible}
      onCancel={onCloseModal}
      width={1000}
      footer={false}
      className={"site-drawer-render-in-current-wrapper ModalAddTimeWorking"}
    >
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={showDrawer}
      >
        Add new
      </Button>
      <Drawer
        title="Add Project"
        placement="right"
        // width={400}
        size={"large"}
        onClose={onClose}
        visible={open}
        keyboard
        className="styleDrawer"
        // bodyStyle={{padding: "5px 6px"}}
        closeIcon={<CloseCircleOutlined title="Thoát (ESC)" />}
        style={{ position: "absolute" }}
        getContainer={false}
      >
        <CardTaoTeam />
      </Drawer>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 400 }}
      />
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
  const [isShowAddProject, setIsShowAddProject] = useState(false);
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

  const fetchListUserName = ()=>{
    GetListUserApi().then((res) =>{
      setLsNameUser(res.data)
    })
  }

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

  const columns = [
    {
      title: "ID",
      dataIndex: "index",
      key: "index",
      filterKey: "index",
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
            onChange={handleChange}
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
      <ModalAddProject
        visible={isShowAddProject}
        onCancel={() => setIsShowAddProject(false)}
        dataInforUser={dataInforUser}
        lsNameUser={lsNameUser}
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
