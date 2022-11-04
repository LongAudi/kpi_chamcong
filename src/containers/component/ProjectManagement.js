import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  TimePicker,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  errorHandle,
  openNotificationWithIcon,
  // validateMessages,
} from "../Function";
import {
  GetProjectApi,
  GetProjectEditApi,
  PostProjectApi,
  PutProjectEditApi,
} from "../../api/projectApi";
import { EditOutlined } from "@ant-design/icons";
import { GetListUserApi } from "../../api/usersApi";
import moment from "moment";
import { useSelector } from "react-redux";

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

const ModalAddProject = ({
  visible,
  onCancel,
  lsNameUser,
  fetchDataProject,
  loading,
  pager,
}) => {
  const [form] = Form.useForm();
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [timeStart1, setTimeStart1] = useState(null);
  const [timeEnd1, setTimeEnd1] = useState(null);
  const [nameLeader, setNameLeader] = useState("");
  const [nameMember, setNameMember] = useState("");

  const onCloseModal = () => {
    form.resetFields();
    onCancel();
  };

  const onSelectTimeStart = (value) => {
    form.setFieldsValue({ gio_vao_ca_1: value });
    setTimeStart(value);
  };

  const onSelectTimeEnd = (value) => {
    form.setFieldsValue({ gio_ra_ca_1: value });
    setTimeEnd(value);
  };

  const getDisableHourIn = () => {
    const timeIn = timeEnd ? timeEnd._d.getHours() : 24;
    let arrCheck = [...Array(24).keys()];
    return arrCheck.filter((item) => item > timeIn);
  };

  const getDisableHourOut = () => {
    const timeIn = timeStart ? timeStart._d.getHours() : 0;
    let arrCheck = [...Array(24).keys()];
    return arrCheck.filter((item) => item < timeIn);
  };

  const onSelectTimeStart1 = (value) => {
    form.setFieldsValue({ gio_vao_ca_2: value });
    setTimeStart1(value);
  };

  const onSelectTimeEnd1 = (value) => {
    form.setFieldsValue({ gio_ra_ca_2: value });
    setTimeEnd1(value);
  };

  const getDisableHourIn1 = () => {
    const timeIn = timeEnd1 ? timeEnd1._d.getHours() : 24;
    let arrCheck = [...Array(24).keys()];
    return arrCheck.filter((item) => item > timeIn);
  };

  const getDisableHourOut1 = () => {
    const timeIn = timeStart1 ? timeStart1._d.getHours() : 0;
    let arrCheck = [...Array(24).keys()];
    return arrCheck.filter((item) => item < timeIn);
  };

  const onFinish = (values) => {
    // var getTime_2 = values.thoi_gian_lam.filter((item)=> item.ten_ca = '2')
    console.log(values.gio_vao_ca_2);
    PostProjectApi({
      name: values.name,
      // custommer: values.custommer,
      user_lead: values.user_lead,
      user_member: values.user_member,
      description: values.description || "",
      // ten_ca_1: values.ten_ca_1,
      gio_vao_ca_1: moment(values.gio_vao_ca_1).format("HH:mm"),
      gio_ra_ca_1: moment(values.gio_ra_ca_1).format("HH:mm"),
      // ten_ca_2: values.ten_ca_2 || "",
      gio_vao_ca_2:
        values.gio_vao_ca_2 === undefined
          ? null
          : moment(values.gio_vao_ca_2).format("HH:mm"),
      gio_ra_ca_2:
        values.gio_ra_ca_2 === undefined
          ? null
          : moment(values.gio_ra_ca_2).format("HH:mm"),
    })
      .then((res) => {
        if (res.data.error) {
          openNotificationWithIcon("error", res.data.error);
        } else {
          openNotificationWithIcon("success", "Success", "");
          fetchDataProject({ page: pager.current, page_size: pager.pageSize });
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

  const handleIDLeader = (id)=>{
    setNameLeader(id)
    form.setFieldsValue({user_member: undefined})
  }

  const handleIDMember = (id)=>{
    setNameMember(id)
  }

  return (
    <Modal
      title="ADD PROJECT"
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
        // onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        initialValues={{
          remember: true,
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Project Name"
              name="name"
              rules={[{ required: true, type: "string" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Time in 1"
              name="gio_vao_ca_1"
              rules={[{ required: true }]}
            >
              <TimePicker
                format="HH:mm"
                placeholder={"Time in"}
                onSelect={(value) => onSelectTimeStart(value)}
                value={timeStart}
                style={{ width: "100%" }}
                minuteStep={15}
                allowClear={false}
                showNow={false}
                disabledHours={getDisableHourIn}
              />
            </Form.Item>
          </Col>
          <Col span={4}></Col>
          <Col span={10}>
            <Form.Item
              label="Time out 1"
              name="gio_ra_ca_1"
              rules={[{ required: true }]}
            >
              <TimePicker
                format="HH:mm"
                placeholder={"Time out"}
                onSelect={(value) => onSelectTimeEnd(value)}
                value={timeEnd}
                style={{ width: "100%" }}
                minuteStep={15}
                showNow={false}
                disabledHours={getDisableHourOut}
                allowClear={false}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Time in 2"
              name="gio_vao_ca_2"
              // rules={[{ required: true }]}
            >
              <TimePicker
                format="HH:mm"
                placeholder={"Time in"}
                onSelect={(value) => onSelectTimeStart1(value)}
                value={timeStart1}
                style={{ width: "100%" }}
                minuteStep={15}
                showNow={false}
                allowClear={false}
                disabledHours={getDisableHourIn1}
              />
            </Form.Item>
          </Col>
          <Col span={4}></Col>
          <Col span={10}>
            <Form.Item
              label="Time out 2"
              name="gio_ra_ca_2"
              // rules={[{ required: true }]}
            >
              <TimePicker
                format="HH:mm"
                placeholder={"Time out"}
                onSelect={(value) => onSelectTimeEnd1(value)}
                value={timeEnd1}
                style={{ width: "100%" }}
                minuteStep={15}
                showNow={false}
                disabledHours={getDisableHourOut1}
                allowClear={false}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Name Leader"
              name="user_lead"
              rules={[{ required: true }]}
            >
              <Select
                // mode="multiple"
                placeholder="Please select"
                size={"middle"}
                style={{
                  width: "100%",
                }}
                allowClear
                onChange={handleIDLeader}
              >
                {/* {children} */}
                {lsNameUser.filter((item)=>item.id !== nameMember ).map((item, index) =>
                  item.group_name === "Admin" ? null : (
                    <Option key={item.id} value={item.id}>
                      {item.username}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Name Member"
              name="user_member"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                placeholder="Please select"
                size={"middle"}
                style={{
                  width: "100%",
                }}
                allowClear
                onChange={handleIDMember}
              >
                {/* {children} */}
                {lsNameUser.filter((item)=>item.id !== nameLeader).map((item, index) =>
                  item.group_name === "Admin" ? null : (
                    <Option key={item.id} value={item.id}>
                      {item.username}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Description" name="description">
              <Input maxLength={100} />
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
          <Button onClick={onCloseModal}>Exit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalEditProject = ({
  visible,
  onCancel,
  dataInforUser,
  lsNameUser,
  lsNameUser1,
  fetchDataProject,
  loading,
  pager,
}) => {
  const [form] = Form.useForm();
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [timeStart1, setTimeStart1] = useState(null);
  const [timeEnd1, setTimeEnd1] = useState(null);
  const [nameLeader, setNameLeader] = useState("");
  const [nameMember, setNameMember] = useState("");

  const onCloseModal = () => {
    form.resetFields();
    onCancel();
  };

  const onSelectTimeStart = (value) => {
    form.setFieldsValue({ gio_vao_ca_1: value });
    setTimeStart(value);
  };

  const onSelectTimeEnd = (value) => {
    form.setFieldsValue({ gio_ra_ca_1: value });
    setTimeEnd(value);
  };

  const getDisableHourIn = () => {
    const timeIn = timeEnd ? timeEnd._d.getHours() : 24;
    let arrCheck = [...Array(24).keys()];
    return arrCheck.filter((item) => item > timeIn);
  };

  const getDisableHourOut = () => {
    const timeIn = timeStart ? timeStart._d.getHours() : 0;
    let arrCheck = [...Array(24).keys()];
    return arrCheck.filter((item) => item < timeIn);
  };

  const onSelectTimeStart1 = (value) => {
    form.setFieldsValue({ gio_vao_ca_2: value });
    setTimeStart1(value);
  };

  const onSelectTimeEnd1 = (value) => {
    form.setFieldsValue({ gio_ra_ca_2: value });
    setTimeEnd1(value);
  };

  const getDisableHourIn1 = () => {
    const timeIn = timeEnd1 ? timeEnd1._d.getHours() : 24;
    let arrCheck = [...Array(24).keys()];
    return arrCheck.filter((item) => item > timeIn);
  };

  const getDisableHourOut1 = () => {
    const timeIn = timeStart1 ? timeStart1._d.getHours() : 0;
    let arrCheck = [...Array(24).keys()];
    return arrCheck.filter((item) => item < timeIn);
  };

  useEffect(() => {
    // form.resetFields();
    if (visible) {
      // console.log(dataInforUser);
      // var getTime_2 = dataInforUser.thoi_gian_lam.filter(
      //   (item) => item.ten_ca === "2"
      // );
      // console.log(getTime_2);
      // form.setFieldsValue({
      //   name: dataInforUser.name,
      //   gio_vao_ca_1: moment(
      //     dataInforUser.thoi_gian_lam.filter((item) => (item.ten_ca = "1"))[0]
      //       .gio_vao,
      //     "HH:mm:ss"
      //   ),
      //   gio_ra_ca_1: moment(
      //     dataInforUser.thoi_gian_lam.filter((item) => (item.ten_ca = "1"))[0]
      //       .gio_ra,
      //     "HH:mm:ss"
      //   ),
      //   gio_vao_ca_2:
      //     getTime_2.length === 2 ? moment(getTime_2[1].gio_vao, "HH:mm") : null,
      //   gio_ra_ca_2:
      //     getTime_2.length === 2 ? moment(getTime_2[1].gio_ra, "HH:mm") : null,
      //   user_lead: dataInforUser.user_lead,
      //   user_member: dataInforUser.user_member,
      //   description: dataInforUser.description,
      // });
      var getTime_2 = dataInforUser.thoi_gian_lam;
      setNameLeader(dataInforUser.user_lead[0])
      form.setFieldsValue({

        name: dataInforUser.name,
        gio_vao_ca_1: moment(
          dataInforUser.thoi_gian_lam[0].gio_vao,"HH:mm:ss"),
        gio_ra_ca_1: moment(
          dataInforUser.thoi_gian_lam[0]
            .gio_ra,
          "HH:mm:ss"
        ),
        gio_vao_ca_2:
          getTime_2.length === 2 ? moment(getTime_2[1].gio_vao, "HH:mm") : null,
        gio_ra_ca_2:
          getTime_2.length === 2 ? moment(getTime_2[1].gio_ra, "HH:mm") : null,
        user_lead: dataInforUser.user_lead,
        user_member: dataInforUser.user_member,
        description: dataInforUser.description,
      });
    }
  }, [visible]);

  const onFinish = (values) => {
    console.log(values.gio_vao_ca_2);
    PutProjectEditApi(dataInforUser.id, {
      name: values.name,
      gio_vao_ca_1: moment(values.gio_vao_ca_1).format("HH:mm"),
      gio_ra_ca_1: moment(values.gio_ra_ca_1).format("HH:mm"),
      gio_vao_ca_2:
        values.gio_vao_ca_2 === null
          ? null
          : moment(values.gio_vao_ca_2).format("HH:mm"),
      gio_ra_ca_2:
        values.gio_ra_ca_2 === null
          ? null
          : moment(values.gio_ra_ca_2).format("HH:mm"),
      id_shifts: dataInforUser.thoi_gian_lam.map((item) => item.id),
      user_lead: values.user_lead,
      user_member: values.user_member,
      description: values.description,
      block: false,
    })
      .then((res) => {
        if (res.data.error) {
          openNotificationWithIcon("error", res.data.error);
        } else {
          openNotificationWithIcon("success", "Success", "");
          fetchDataProject({ page: pager.current, page_size: pager.pageSize });
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

  const handleIDLeader = (id)=>{
    setNameLeader(id)
    form.setFieldsValue({user_member: undefined})
  }

  const handleIDMember = (id)=>{
    setNameMember(id)
  }

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
        // onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Project Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input maxLength={100} disabled />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Time in 1"
              name="gio_vao_ca_1"
              rules={[{ required: true }]}
            >
              <TimePicker
                format="HH:mm"
                placeholder={"Time in"}
                onSelect={(value) => onSelectTimeStart(value)}
                value={timeStart}
                style={{ width: "100%" }}
                minuteStep={15}
                allowClear={false}
                showNow={false}
                disabledHours={getDisableHourIn}
              />
            </Form.Item>
          </Col>
          <Col span={4}></Col>
          <Col span={10}>
            <Form.Item
              label="Time out 1"
              name="gio_ra_ca_1"
              rules={[{ required: true }]}
            >
              <TimePicker
                format="HH:mm"
                placeholder={"Time out"}
                onSelect={(value) => onSelectTimeEnd(value)}
                value={timeEnd}
                style={{ width: "100%" }}
                minuteStep={15}
                showNow={false}
                disabledHours={getDisableHourOut}
                allowClear={false}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Time in 2"
              name="gio_vao_ca_2"
              // rules={[{ required: true }]}
            >
              <TimePicker
                format="HH:mm"
                placeholder={"Time in"}
                onSelect={(value) => onSelectTimeStart1(value)}
                value={timeStart1}
                style={{ width: "100%" }}
                minuteStep={15}
                showNow={false}
                allowClear={false}
                disabledHours={getDisableHourIn1}
              />
            </Form.Item>
          </Col>
          <Col span={4}></Col>
          <Col span={10}>
            <Form.Item
              label="Time out 2"
              name="gio_ra_ca_2"
              // rules={[{ required: true }]}
            >
              <TimePicker
                format="HH:mm"
                placeholder={"Time out"}
                onSelect={(value) => onSelectTimeEnd1(value)}
                value={timeEnd1}
                style={{ width: "100%" }}
                minuteStep={15}
                showNow={false}
                disabledHours={getDisableHourOut1}
                allowClear={false}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Name Leader"
              name="user_lead"
              rules={[{ required: true }]}
            >
              <Select
                // mode="multiple"
                placeholder="Please select"
                size={"middle"}
                style={{
                  width: "100%",
                }}
                allowClear
                onChange={handleIDLeader}
              >
                {/* {children} */}
                {lsNameUser.filter((item)=>item.id !== nameMember ).map((item, index) =>
                  item.group_name === "Admin" ? null : (
                    <Option key={item.username} value={item.id}>
                      {item.username}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Name Member"
              name="user_member"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                placeholder="Please select"
                size={"middle"}
                style={{
                  width: "100%",
                }}
                allowClear
                onChange={handleIDMember}
                
              >
                {lsNameUser.filter((item)=>item.id !== nameLeader).map((item, index) =>
                  item.group_name === "Admin" ? null : (
                    <Option key={item.username} value={item.id}>
                      {item.username}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Description" name="description">
              <Input maxLength={100} />
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
            loading={loading}
          >
            Update
          </Button>
          <Button onClick={onCloseModal}>Exit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

function ProjectManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShowAddProject, setIsShowAddProject] = useState(false);
  const [lsNameUser, setLsNameUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [dataInforUser, setDataInforUser] = useState([]);
  const defaultPageSize = 10;
  const [pager, setPager] = useState({
    pageSize: defaultPageSize,
    count: 0,
    current: 1,
  });
  // const userInfo = useSelector((state) => state.getUserInfo.userInfo);

  const fetchDataProject = (params = {}) => {
    setLoading(true);
    GetProjectApi(params)
      .then((res) => {
        // console.log(res.data);
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
    fetchDataProject({ page: pager.current, page_size: pager.pageSize });
    // setLsTeamSelected(form.getFieldValue("ten_ca_1") || []);
  }, []);

  const handleChange = (pagination) => {
    const currentPager = { ...pager };
    currentPager.current = pagination.current;
    currentPager.pageSize = pagination.pageSize;
    setPager({ ...currentPager });
    fetchDataProject({
      status: currentPager.status,
      page_size: pagination.pageSize,
      page: pagination.current,
    });
  };

  const fetchListUserName = () => {
    GetListUserApi().then((res) => {
      // setLsNameUser(res.data.filter((item)=>item.customer==userInfo.customer));
      setLsNameUser(res.data);
    });
  };

  useEffect(() => {
    // console.log(1);
    fetchListUserName();
  }, []);

  const onShowModalEdit = (record) => {
    GetProjectEditApi(record.id)
      .then((res) => {
        setDataInforUser(res.data);
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
      title: "Project",
      dataIndex: "name",
      key: "name",
      filterKey: "name",
      type: "text",
      canSearch: true,
      width: 150,
      align: "center",
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
      render: (value, record) =>
        record.user_member.length + record.user_lead.length,
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
      render: (value, record) => (
        <div
          className="btngroup1"
          // style={{ display: "flex", marginLeft: "55px" }}
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
        </div>
      ),
    },
  ];
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
                  onClick={() => setIsShowAddProject(true)}
                >
                  Add New Project
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={loading}
            scroll={{ y: 400 }}
            className="tableUser"
            onChange={handleChange}
            // style={{borderRadius: 20}}
          />

          <ModalAddProject
            visible={isShowAddProject}
            onCancel={() => setIsShowAddProject(false)}
            lsNameUser={lsNameUser}
            fetchDataProject={fetchDataProject}
            pager={pager}
            loading={loading}
          />
          <ModalEditProject
            visible={isEditing}
            onCancel={() => setIsEditing(false)}
            dataInforUser={dataInforUser}
            lsNameUser={lsNameUser}
            lsNameUser1={lsNameUser}
            fetchDataProject={fetchDataProject}
            pager={pager}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectManagement;
