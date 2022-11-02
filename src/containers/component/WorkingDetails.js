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
  Alert,
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
import { useSelector } from "react-redux";

const data = [
  {
      "id": 1,
      "username": "test_member",
      "project_name": "Staff",
      "ten_ca": 'Ca 1',
      "gio_vaora": ['08:15', '08:00'],
      'time_start':'08:00',
      'time_break':'09:00',
      'time_resume':'09:15',
      "time_leaves": ['10:00', '10:30'],
      "time_end":'12:00',
      "comment":'Báo cáo: thời gian làm việc ca 1'
  },
  {
    "id": 2,
    "username": "test_member",
    "project_name": "Staff",
    "ten_ca": 'Ca 2',
    "gio_vaora": ['13:00', '17:00'],
    'time_start':'13:00',
    'time_break':'14:00',
    'time_resume':'14:15',
    "time_leaves": ['15:00', '15:30'],
    "time_end":'17:00',
    "comment":'Báo cáo: thời gian làm việc ca 2'
  },
]

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

function WorkingDetails() {
  const defaultPageSize = 10;
  const [pager, setPager] = useState({
    pageSize: defaultPageSize,
    count: 0,
    current: 1,
  });
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const userInfo = useSelector((state) => state.getUserInfo.userInfo);

  const fetchData = (params = {}) => {
    setLoading(false);
    // GetListUserApi(params)
    //   .then((res) => {
    //     setData(res.data);
    //     setPager({
    //       current: params.page,
    //       pageSize: params.page_size,
    //       count: res.data.count,
    //     });
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     errorHandle(err);
    //     setLoading(false);
    //   });
  };

 
  
  useEffect(() => {
    fetchData({ page: pager.current, page_size: pager.pageSize, search });
  }, []);

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
      title: "Project",
      dataIndex: "project_name",
      key: "project_name",
      filterKey: "project_name",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
    },
    {
      title: "Working Shift",
      dataIndex: "gio_vaora",
      key: "gio_vaora",
      filterKey: "gio_vaora",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
      render: (value, record) => value.length != 0 ? `${value[0]} - ${value[1]}`: '',
    },
    {
      title: "Login",
      dataIndex: "time_start",
      key: "time_start",
      filterKey: "time_start",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
    },
    {
      title: "Break",
      dataIndex: "time_break",
      key: "time_break",
      filterKey: "time_break",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
    },
    {
      title: "Resume",
      dataIndex: "time_resume",
      key: "time_resume",
      filterKey: "time_resume",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
    },
    {
      title: "Leaves",
      dataIndex: "time_leaves",
      key: "time_leaves",
      filterKey: "time_leaves",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
      render: (value, record) => value.length != 0 ? `${value[0]} - ${value[1]}`: '',
    },
    {
      title: "Logout",
      dataIndex: "time_end",
      key: "time_end",
      filterKey: "time_end",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
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
                // onClick={() => {
                //   onShowModalEdit(record);
                // }}
              />
            </Tooltip>
          </div>
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
              <Alert
                message="Success Tips"
                type="success"
                showIcon
                action={
                  <Button size="small" type="text">
                    WORKING DETAILS
                  </Button>
                }
                closable
              />
                <h1 className="h1UserTable">WORKING DETAILS</h1>
               
              </Col>
              <Col span={12}>
                
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
            expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record.comment}
                </p>
              ),
              rowExpandable: (record) => record.comment !== null,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkingDetails;
