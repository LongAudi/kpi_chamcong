import React, { useEffect, useState } from "react";
import { Table, Tooltip, Button, Modal, Form, Input, Row, Col } from "antd";
import { errorHandle, openNotificationWithIcon } from "../Function";
import { GetListUserApi, PostUserApi } from "../../api/usersApi";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// const validateMessages = {
//   required: '${label} là bắt buộc.',
//   types: {
//   },
//   number: {
//   },
// };

function User({ visible, onCancel }) {
  const defaultPageSize = 10;
  const [pager, setPager] = useState({
    pageSize: defaultPageSize,
    count: 0,
    current: 1,
  });
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaiKhoan, setEditingTaiKhoan] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModalAddUser = () => {
    setIsModalVisible(true);
  };

  const onCloseModal =()=>{
    form.resetFields();
    onCancel();
}
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  useEffect(() => {
    // console.log(1);
    fetchData({ page: pager.current, page_size: pager.pageSize, search });
  }, []);

  const onEditTaiKhoan = (record) => {
    setIsEditing(true);
    setEditingTaiKhoan({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingTaiKhoan(null);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
          return "Admin";
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
      title: "Thao tác",
      key: "thaoTac",
      fixed: "right",
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
                  onEditTaiKhoan(record);
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

  const onFinish = (values) => {
    PostUserApi({
      username: values.username,
      email: values.email,
      last_name: values.last_name,
      first_name: values.first_name,
    })
      .then((r) => {
        form.resetFields();
        // updateData();
        openNotificationWithIcon("success", "Thành công", "");
        onCancel();
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
                  Primary
                </Button>
              </Col>
            </Row>
          </div>

          {/* MODAL ADD USER */}

          <Modal
            title="ADD USER"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
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
              // validateMessages={validateMessages}
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
              </Row>
              <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
                <Button type="success" htmlType="submit" className={"m-2"}>
                  Thêm
                </Button>
                <Button onClick={onCloseModal}>Thoát</Button>
              </Form.Item>
            </Form>
          </Modal>

          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            size="middle"
            loading={loading}
            scroll={{ x: 500 }}
          />

          {/* MODAL EDIT USER */}

          <Modal
            title="Basic Modal"
            visible={isEditing}
            okText="save"
            onCancel={() => {
              resetEditing();
            }}
          >
            <Form form={form} layout="vertical" autoComplete="off">
              <Row>
                <Col span={11}>
                  <Form.Item
                    name="User"
                    label="User"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="User"></Input>
                  </Form.Item>
                </Col>
                <Col span={11} offset={2}>
                  <Form.Item
                    name="User"
                    label="User"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="User"></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default User;
