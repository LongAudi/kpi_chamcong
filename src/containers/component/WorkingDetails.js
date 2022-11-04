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
import { GetProjectWithUserAPI, GetWorkingShiftsLeadAPI, GetWorkingShiftsUserAPI } from "../../api/homeAPI";
import { localhost } from "../../server";

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
  const [lsProjectWithUser, setLsProjectWithUser] = useState([]);
  const [selectProjectID, setSelectProjectID] = useState(null);
  const [selectShiftsID, setselectShiftsID] = useState(null);
  const userInfo = useSelector((state) => state.getUserInfo.userInfo);
  const [dataWorkingShifts, setDataWorkingShifts] = useState([]);

  const fetchProjectWithUser = (params = {}) => {
    GetProjectWithUserAPI()
      .then((res) => {
        setLsProjectWithUser(res.data);
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  const fetchWorkingShiftsUser = (params = {}) => {
    GetWorkingShiftsLeadAPI(params)
      .then((res) => {
        console.log(res.data);
        // console.log( moment(res.data[0].created_at).moment(res.data[0].time_break, 'HH:mm:ss').format('HH:mm'));
        setDataWorkingShifts(res.data);
        
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  useEffect(() => {
    fetchProjectWithUser();
  }, []);

  const onChangeProject = (value) => {
    setSelectProjectID(value);
    setselectShiftsID('');
    setDataWorkingShifts(null);
    // console.log(lsProjectWithUser.filter(item => item.id == selectProjectID)[0].thoi_gian_lam.map( (item) => item.id ));
  };

  const onChangeShifts = (value) => {
    setselectShiftsID(value);
    setDataWorkingShifts([]);
    fetchWorkingShiftsUser({
      project_id: selectProjectID,
      thoigianlam_id: value
    })
    
    // console.log(lsProjectWithUser.filter(item => item.id == selectProjectID)[0].thoi_gian_lam.map( (item) => item.id ));
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
      dataIndex: "user",
      key: "user",
      filterKey: "user",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
      render: (value, record) => value[0].username,
    },
    {
      title: "Project",
      dataIndex: "data_project",
      key: "data_project",
      filterKey: "data_project",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
      render: (value, record) => value[0].name,
    },
    // {
    //   title: "Working Shift",
    //   dataIndex: "thoigianlam",
    //   key: "thoigianlam",
    //   filterKey: "thoigianlam",
    //   align: "center",
    //   type: "text",
    //   canSearch: true,
    //   width: 150,
    //   // render: (value, record) => value.length != 0 ? `${value[0]} - ${value[1]}`: '',
    // },
    {
      title: "Login",
      dataIndex: "time_start",
      key: "time_start",
      filterKey: "time_start",
      align: "center",
      type: "text",
      canSearch: true,
      width: 150,
      render: (value, record) =>value? moment(value).format("DD/MM/YYYY hh:mm:ss") : "",
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
      render: (value, record) =>value? moment(value).format("DD/MM/YYYY hh:mm:ss") : "",
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
      render: (value, record) =>value? moment(value).format("DD/MM/YYYY hh:mm:ss") : "",
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
      render: (value, record) => `${value ?moment(record.time_leaves_start).format("DD/MM/YYYY hh:mm:ss"):""} - ${value ?moment(record.time_leaves_end).format("DD/MM/YYYY hh:mm:ss"): ""}`,
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
      render: (value, record) =>value? moment(value).format("DD/MM/YYYY hh:mm:ss") :"",
    },
  ];

  const handleChange = (pagination) => {
    const currentPager = { ...pager };
    currentPager.current = pagination.current;
    currentPager.pageSize = pagination.pageSize;
    setPager({ ...currentPager });
    // fetchData({
    //   status: currentPager.status,
    //   page_size: pagination.pageSize,
    //   page: pagination.current,
    //   search,
    // });
  };

  const expandedRowRender = (record) => {
    console.log(record);
    const columnsReport = [
      {
        title: 'Content',
        dataIndex: 'comment',
        key: 'comment',
        align: "center",
      },
      {
        title: 'Attachments',
        dataIndex: 'namefile',
        key: 'namefile',
        // align: "center",
        render: (value, record) =><a href={localhost + "/media/" + record.file_repor} target="_blank" download style={{color:'rgb(49 150 245)'}}>{value}</a> ,
      },
    ];
    const dataReport = record.data_report;



    return <Table columns={columnsReport} dataSource={dataReport} pagination={false} />;

  }

  return (
    <div className="FormHomeTable">
      <div className="FormHome1">
        <div className="FormHome2">
          <div className="HeaderContentUser">
          </div>
            <Row>
              <Col span={5}>
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  onChange={onChangeProject}
                  placeholder="Please select a project"
                  >
                  {lsProjectWithUser.map((item, index) => (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))}
                </Select>
              </Col>
              <Col span={5} offset={1}>
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  onChange={onChangeShifts}
                  placeholder="Please select a shift"
                  value={selectShiftsID}
                  >
                    <Select.Option key={"All"} value={"All"}>All</Select.Option>
                  {selectProjectID && lsProjectWithUser.filter(item => item.id == selectProjectID)[0].thoi_gian_lam.map((item, index) => (<Select.Option key={item.id} value={item.id}>{item.gio_vao} - {item.gio_ra}</Select.Option>))}
                </Select>

              </Col>
            </Row>
          <br></br>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={dataWorkingShifts}
            size="small"
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
              expandedRowRender,
              defaultExpandedRowKeys: ['0'],
            }}
            // expandable={{
              // expandedRowRender: (record) => (
              //   <p
              //     style={{
              //       margin: 0,
              //     }}
              //   >
              //     {record.comment}
              //   </p>
              // ),
              // rowExpandable: (record) => record.comment !== null,
            // }}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkingDetails;
