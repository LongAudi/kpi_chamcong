import React, { useEffect, useState } from "react";
import {
  Col,
  Layout,
  Row,
  DatePicker,
  Button,
  Upload,
  message,
  TimePicker,
  Form,
  PageHeader,
  TreeSelect,
  Select,
  Badge,
  Tooltip,
  Input,
} from "antd";
import moment from "moment";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import { errorHandle, openNotificationWithIcon } from "../Function";
import {
  GetProjectWithUserAPI,
  GetWorkingShiftsUserAPI,
  PostNotificationApi,
  PostReportApi,
  PostTimeBreak_ShiftApi,
  PostTimeEnd_ShiftApi,
  PostTimeLeaves_ShiftApi,
  PostTimeResume_ShiftApi,
  PostTimeStart_ShiftApi,
} from "../../api/homeAPI";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const { Content } = Layout;
// const { RangePicker } = DatePicker;

function Home() {
  const [checkShifts, setCheckShifts] = useState(true);
  const [lsProjectWithUser, setLsProjectWithUser] = useState([]);
  const [selectProjectID, setSelectProjectID] = useState();
  const [selectShiftsID, setselectShiftsID] = useState();
  const [fileUpload, setFileUpload] = useState([]);
  const [form] = Form.useForm();
  const [dataWorkingShifts, setDataWorkingShifts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjectWithUser = (params = {}) => {
    GetProjectWithUserAPI()
      .then((res) => {
        console.log(res.data);
        setLsProjectWithUser(res.data);
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  useEffect(() => {
    fetchProjectWithUser();
    form.resetFields();
  }, []);

  const fetchWorkingShiftsUser = (params = {}) => {
    GetWorkingShiftsUserAPI(params)
      .then((res) => {
        console.log(res.data[0]);
        // console.log( moment(res.data[0].created_at).moment(res.data[0].time_break, 'HH:mm:ss').format('HH:mm'));
        setDataWorkingShifts(res.data[0]);
        form.setFieldsValue({
          time_login:
            res.data[0].time_start != null
              ? moment(res.data[0].time_start)
              : res.data[0].time_start,
          time_break:
            res.data[0].time_break != null
              ? moment(res.data[0].time_break)
              : res.data[0].time_break,
          time_resume:
            res.data[0].time_resume != null
              ? moment(res.data[0].time_resume)
              : res.data[0].time_resume,
          time_leaves:
            res.data[0].time_leaves_start != null
              ? [
                  moment(res.data[0].time_leaves_start),
                  moment(res.data[0].time_leaves_end),
                ]
              : null,
          time_logout:
            res.data[0].time_end != null
              ? moment(res.data[0].time_end)
              : res.data[0].time_end,
        });
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  const onChangeProject = (value) => {
    setSelectProjectID(value);
    setselectShiftsID([]);
    form.resetFields();
    // console.log(lsProjectWithUser.filter(item => item.id == selectProjectID)[0].thoi_gian_lam.map( (item) => item.id ));
  };

  const onChangeShifts = (value) => {
    setselectShiftsID(value);
    setDataWorkingShifts([]);
    form.resetFields();
    fetchWorkingShiftsUser({
      project_id: selectProjectID,
      thoigianlam_id: value,
    });
    setCheckShifts(false);
    // console.log(lsProjectWithUser.filter(item => item.id == selectProjectID)[0].thoi_gian_lam.map( (item) => item.id ));
  };

  const onOk = (value) => {
    // console.log("onOk: ", value);
  };

  const dateFormat = "DD/MM/YYYY HH:mm:ss";

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const theme = "snow";

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
    ],
  };

  const placeholder = "Hello world";

  const formats = [
    "bold",
    "italic",
    "underline",
    "size",
    "color",
    "background",
  ];

  const { quillRef } = useQuill({ theme, modules, formats, placeholder });

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type !== "application/pdf" &&
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document;" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    // console.log(isJpgOrPng);
    if (isJpgOrPng) {
      message.error(
        "Only file formats are supported (pdf, png, jpg, jpeg, xlsx, pptx, docx)"
      );
    }

    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("Image must smaller than 5MB!");
    }

    return isJpgOrPng && isLt2M;
    // return isJpgOrPng && isLt2M;
  };

  const onFinishShifts = (values) => {
    if (form.getFieldValue("time_login") === undefined) {
      openNotificationWithIcon(
        "warning",
        "Warning",
        "Please choose a time to Login"
      );
      return false;
    }

    setLoading(true);
    var FormData = require("form-data");
    var data = new FormData();
    data.append("project_id", selectProjectID);
    data.append("shift_id", selectShiftsID);
    data.append("calamviec_id", dataWorkingShifts["id"]);
    data.append("name", "");
    data.append("comment", values.comment);
    console.log(fileUpload);
    if (fileUpload != undefined && fileUpload.length != 0) {
      fileUpload.forEach((element) => {
        data.append("file_report", element.originFileObj);
      });
    } else {
      data.append("file_report", "");
    }
    PostReportApi(data)
      .then((res) => {
        if (res.data.error) {
          openNotificationWithIcon("error", res.data.error);
        } else {
          form.setFieldsValue({
            comment: undefined,
          });
          setFileUpload([]);
          openNotificationWithIcon("success", "Submit success report", "");
          postNotification({
            project_id: selectProjectID,
            thoigianlam_id: selectShiftsID,
            content: "Report",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        openNotificationWithIcon("error", err.data.error);
        setFileUpload([]);
        setLoading(false);
      });
  };

  const onFinishShiftsFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const postNotification = (params = {}) => {
    PostNotificationApi(params)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  const checkLogin = () => {
    PostTimeStart_ShiftApi({
      project_id: selectProjectID,
      thoigianlam_id: selectShiftsID,
    })
      .then((res) => {
        console.log(res);
        fetchWorkingShiftsUser({
          project_id: selectProjectID,
          thoigianlam_id: selectShiftsID,
        });
        postNotification({
          project_id: selectProjectID,
          thoigianlam_id: selectShiftsID,
          content: "Login",
        });

        openNotificationWithIcon("success", "Create time to Login success", "");
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  const checkBreak = () => {
    PostTimeBreak_ShiftApi({
      project_id: selectProjectID,
      thoigianlam_id: selectShiftsID,
    })
      .then((res) => {
        console.log(res);
        fetchWorkingShiftsUser({
          project_id: selectProjectID,
          thoigianlam_id: selectShiftsID,
        });
        openNotificationWithIcon("success", "Create time to Break success", "");
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  const checkResume = () => {
    PostTimeResume_ShiftApi({
      project_id: selectProjectID,
      thoigianlam_id: selectShiftsID,
    })
      .then((res) => {
        console.log(res);
        fetchWorkingShiftsUser({
          project_id: selectProjectID,
          thoigianlam_id: selectShiftsID,
        });
        openNotificationWithIcon(
          "success",
          "Create time to Resume success",
          ""
        );
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  const checkLeaves = () => {
    var lsCheck = [];
    if (form.getFieldValue("time_login") === undefined) {
      lsCheck.push("login");
    }
    if (form.getFieldValue("time_leave") === undefined) {
      lsCheck.push("leave");
    }
    if (lsCheck.length != 0) {
      openNotificationWithIcon(
        "warning",
        "Warning",
        "Please choose a time to " + lsCheck.join(", ")
      );
      return false;
    }
    // click check empty value
    PostTimeLeaves_ShiftApi({
      project_id: selectProjectID,
      thoigianlam_id: selectShiftsID,
      time_leaves_start: form.getFieldValue("time_leave")[0],
      time_leaves_end: form.getFieldValue("time_leave")[1],
    })
      .then((res) => {
        console.log(res);
        fetchWorkingShiftsUser({
          project_id: selectProjectID,
          thoigianlam_id: selectShiftsID,
        });
        openNotificationWithIcon(
          "success",
          "Create time to Leaves success",
          ""
        );
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  const checkLogout = () => {
    if (form.getFieldValue("time_login") === undefined) {
      openNotificationWithIcon(
        "error",
        "Error",
        "Please choose a time to login"
      );
    }
    PostTimeEnd_ShiftApi({
      project_id: selectProjectID,
      thoigianlam_id: selectShiftsID,
    })
      .then((res) => {
        console.log(res);
        fetchWorkingShiftsUser({
          project_id: selectProjectID,
          thoigianlam_id: selectShiftsID,
        });
        postNotification({
          project_id: selectProjectID,
          thoigianlam_id: selectShiftsID,
          content: "Logout",
        });
        openNotificationWithIcon(
          "success",
          "Create time to Logout success",
          ""
        );
      })
      .catch((err) => {
        errorHandle(err);
      });
  };

  const handleChangeUpload = ({ fileList }) => {
    setFileUpload(fileList);
  };

  return (
    <Row>
      <div className="FormHome">
        <div className="FormHome1">
          <div className="FormUser2">
            <div className="formItemHome" style={{ marginBottom: "24px" }}>
              <Row>
                <Col span={12}>
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    onChange={onChangeProject}
                    placeholder="Please select a project"
                  >
                    {lsProjectWithUser.map((item, index) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col span={11} offset={1}>
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    onChange={onChangeShifts}
                    placeholder="Please select a shift"
                    value={selectShiftsID}
                  >
                    {selectProjectID &&
                      lsProjectWithUser
                        .filter((item) => item.id == selectProjectID)[0]
                        .thoi_gian_lam.map((item, index) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.gio_vao} - {item.gio_ra}
                          </Select.Option>
                        ))}
                  </Select>
                </Col>
              </Row>
            </div>

            <Form
              form={form}
              colon={false}
              labelCol={{
                span: 9,
              }}
              wrapperCol={
                {
                  // span: 15,
                  // offset:2
                }
              }
              disabled={checkShifts}
              onFinish={onFinishShifts}
              onFinishFailed={onFinishShiftsFailed}
            >
              <Form.Item
                name="time_login"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    onClick={() => checkLogin()}
                    block
                    disabled={
                      dataWorkingShifts && dataWorkingShifts.time_start != null
                        ? true
                        : false
                    }
                  >
                    Login
                  </Button>
                }
                style={{ marginBottom: "24px" }}
              >
                <DatePicker
                  // showTime
                  // onChange={onChange}
                  onOk={onOk}
                  className="rightContent"
                  disabledDate={disabledDate}
                  format={dateFormat}
                  // value={newDay}
                  placeholder=""
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="time_break"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    block
                    onClick={() => checkBreak()}
                    disabled={
                      dataWorkingShifts &&
                      (dataWorkingShifts.time_end != null ||
                        dataWorkingShifts.time_break != null)
                        ? true
                        : false
                    }
                  >
                    Take a break
                  </Button>
                }
                style={{ marginBottom: "24px" }}
              >
                <DatePicker
                  // showTime
                  // onChange={onChange1}
                  onOk={onOk}
                  className="rightContent"
                  disabledDate={disabledDate}
                  format={dateFormat}
                  // value={newDay1}
                  open={false}
                  placeholder=""
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="time_resume"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    onClick={() => checkResume()}
                    block
                    disabled={
                      dataWorkingShifts &&
                      (dataWorkingShifts.time_resume != null ||
                        dataWorkingShifts.time_end != null)
                        ? true
                        : false
                    }
                  >
                    Resume
                  </Button>
                }
                style={{ marginBottom: "24px" }}
              >
                <DatePicker
                  // showTime
                  // onChange={onChange2}
                  onOk={onOk}
                  className="rightContent"
                  disabledDate={disabledDate}
                  format={dateFormat}
                  // value={newDay2}
                  open={false}
                  placeholder=""
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="time_leaves"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    onClick={checkLeaves}
                    block
                    disabled={
                      dataWorkingShifts &&
                      (dataWorkingShifts.time_leaves_start != null ||
                        dataWorkingShifts.time_end != null)
                        ? true
                        : false
                    }
                  >
                    Leaves
                  </Button>
                }
                style={{ marginBottom: "24px" }}
              >
                <TimePicker.RangePicker
                  className="rightContent"
                  use12Hours
                  format="h:mm A"
                  onChange={(value) =>
                    form.setFieldsValue({ time_leave: value })
                  }
                  disabled={
                    dataWorkingShifts &&
                    (dataWorkingShifts.time_leaves_start != null ||
                      dataWorkingShifts.time_end != null)
                      ? true
                      : false
                  }
                  // defaultValue={[moment('12:08:23', 'HH:mm:ss'),moment('12:08:23', 'HH:mm:ss')]}
                  // disabled
                />
              </Form.Item>
              <Form.Item
                name="time_logout"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    onClick={() => checkLogout()}
                    block
                    disabled={
                      dataWorkingShifts &&
                      (dataWorkingShifts.time_start == null ||
                        dataWorkingShifts.time_end != null)
                        ? true
                        : false
                    }
                  >
                    Logout
                  </Button>
                }
                style={{ marginBottom: "24px" }}
              >
                <DatePicker
                  // showTime
                  // onChange={onChange}
                  onOk={onOk}
                  className="rightContent"
                  disabledDate={disabledDate}
                  format={dateFormat}
                  // value={newDay}
                  placeholder=""
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="comment"
                className="formItemHomeText"
                style={{ marginBottom: "24px" }}
              >
                <Input.TextArea
                  placeholder="Hello"
                  autoSize={{
                    minRows: 3,
                    maxRows: 4,
                  }}
                  style={{ borderRadius: "10px" }}
                  disabled={checkShifts}
                />
              </Form.Item>
              <Form.Item
                name="disabled"
                className="formItemHome"
                style={{ marginBottom: "24px" }}
              >
                <Upload
                  name="uploadFile"
                  onChange={handleChangeUpload}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  fileList={fileUpload}
                  accept="image/png, image/jpeg, .pdf, .xlsx, .pptx, .docx"
                >
                  <Button
                    className="textContent"
                    type="dashed"
                    icon={<UploadOutlined />}
                    block
                  >
                    <Tooltip
                      title="Only file formats are supported (pdf, png, jpg, jpeg, xlsx, pptx, docx)"
                      // color="gray"
                    >
                      {/* <InfoOutlined style={{color: '#gray',}}/> */}
                      Click to Upload
                    </Tooltip>
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="disabled"
                // className="formItemHome"
                style={{ textAlign: "center" }}
              >
                <Button
                  type="primary"
                  shape="round"
                  className="btnSendHome"
                  htmlType="submit"
                  icon={<SendOutlined />}
                  disabled={
                    dataWorkingShifts && dataWorkingShifts.time_start == null
                      ? true
                      : false
                  }
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      {/* </Col> */}
      {/* <Col span={8}></Col> */}
    </Row>
  );
}

export default Home;
