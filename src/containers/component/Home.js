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
  Tooltip
} from "antd";
import moment from "moment";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import { errorHandle } from "../Function";
import { GetProjectWithUserAPI, GetWorkingShiftsUserAPI } from "../../api/homeAPI";

const { Content } = Layout;
// const { RangePicker } = DatePicker;

function Home () {
  // const [newDay, setNewDay] = useState();
  // const [newDay1, setNewDay1] = useState();
  // const [newDay2, setNewDay2] = useState();
  // const [newDay3, setNewDay3] = useState();
  const [checkShifts, setCheckShifts] = useState(false);
  const [lsProjectWithUser, setLsProjectWithUser] = useState([]);
  const [selectProjectID, setSelectProjectID] = useState();
  const [fileUpload, setFileUpload] = useState([]);
  const [form] = Form.useForm();
  const [dataWorkingShifts, setDataWorkingShifts] = useState([]);

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
          console.log(res.data);
          setDataWorkingShifts(res.data);
        })
        .catch((err) => {
          errorHandle(err);
        });
    };

    const postWorkingShiftsUser = (params = {}) => {
      // setLoading(true);
      // PutRoleUserApi({
      //     userId: dataInforUser.id,
      //     lsGroupRole: lsGroupUpdate,
      //     listRole: lsTeam
      // })
      // .then(res=>{
      //     if (res.data.error) {
      //         openNotificationWithIcon('error', res.data.error)
      //     } else {
      //         fetchData({page:pager.current,page_size:pager.pageSize});
      //         onCancelModal();
      //     };
      //     setLoading(false);
      //     setLoading_NQ(false);
      // })
      // .catch(err=>{
      //     if (err.data.error) {
      //         openNotificationWithIcon('error', err.data.error)
      //     };
      //     setLoading(false);
      //     setLoading_NQ(false);
      // });
      };

    const putWorkingShiftsUser = (params = {}) => {
      // setLoading(true);
      // PutRoleUserApi({
      //     userId: dataInforUser.id,
      //     lsGroupRole: lsGroupUpdate,
      //     listRole: lsTeam
      // })
      // .then(res=>{
      //     if (res.data.error) {
      //         openNotificationWithIcon('error', res.data.error)
      //     } else {
      //         fetchData({page:pager.current,page_size:pager.pageSize});
      //         onCancelModal();
      //     };
      //     setLoading(false);
      //     setLoading_NQ(false);
      // })
      // .catch(err=>{
      //     if (err.data.error) {
      //         openNotificationWithIcon('error', err.data.error)
      //     };
      //     setLoading(false);
      //     setLoading_NQ(false);
      // });
    };

    const onChangeProject = (value) => {
      // console.log(value);
      setSelectProjectID(value);
      // console.log(lsProjectWithUser.filter(item => item.id == selectProjectID)[0].thoi_gian_lam.map( (item) => item.id ));
    };

    const onChangeShifts = (value) => {
      console.log(value);
      setSelectProjectID(value);
      // fetchWorkingShiftsUser({
      //   project_id:
      //   thoigianlam_id:
      // })
      // console.log(lsProjectWithUser.filter(item => item.id == selectProjectID)[0].thoi_gian_lam.map( (item) => item.id ));
    };

    // const onChange = (value, dateString) => {
    //   setNewDay(value);
    // };

    // const onChange1 = (value1, dateString) => {
    //   setNewDay1(value1);
    // };

    // const onChange2 = (value2, dateString) => {
    //   setNewDay2(value2);
    // };

    // const onChange3 = (value3, dateString) => {
    //   setNewDay3(value3);
    // };

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
      console.log(file);
      const isJpgOrPng =
        file.type !== "application/pdf" &&
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document;" &&
        file.type !== "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      // console.log(isJpgOrPng);
      if (isJpgOrPng) {
        message.error("Only file formats are supported (pdf, png, jpg, jpeg, xlsx, pptx, docx)");
      }

      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        message.error("Image must smaller than 5MB!");
      }

      return isJpgOrPng && isLt2M;
    };

    const onFinishShifts = (values) => {
      console.log(values)
      console.log(form.getFieldValue("time_login"))
      

      // setLoading(true);
      // PutRoleUserApi({
      //     userId: dataInforUser.id,
      //     lsGroupRole: lsGroupUpdate,
      //     listRole: lsTeam
      // })
      // .then(res=>{
      //     if (res.data.error) {
      //         openNotificationWithIcon('error', res.data.error)
      //     } else {
      //         fetchData({page:pager.current,page_size:pager.pageSize});
      //         onCancelModal();
      //     };
      //     setLoading(false);
      //     setLoading_NQ(false);
      // })
      // .catch(err=>{
      //     if (err.data.error) {
      //         openNotificationWithIcon('error', err.data.error)
      //     };
      //     setLoading(false);
      //     setLoading_NQ(false);
      // });
    };

    const onFinishShiftsFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const checkLogin = (values) => {
      console.log(values)
      postWorkingShiftsUser()
    };

    const checkBreak = (values) => {
      console.log(values)
      putWorkingShiftsUser()
    };

    const checkResume = (values) => {
      console.log(values)
      putWorkingShiftsUser()
    };

    const checkLeaves = (values) => {
      console.log(values)
      putWorkingShiftsUser()
    };

    const checkLogout = (values) => {
      console.log(values)
      putWorkingShiftsUser()
    };

    return (
      <Row>
        {/* <Col span={8}></Col> */}
        {/* <Col span={8}> */}
        <div className="FormHome">
          <div className="FormHome1">
            {/* <h1>Hello</h1> */}
            <div className="FormHome2">
              <div
                className="formItemHome"
                style={{ marginBottom: "24px" }}
              >
                <Row>
                  <Col span={12}>
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      onChange={onChangeProject}
                    >
                      {lsProjectWithUser.map((item, index) => (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))}
                    </Select>
                  </Col>
                  <Col span={11} offset={1}>
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      onChange={onChangeShifts}
                    >
                      {selectProjectID && lsProjectWithUser.filter(item => item.id == selectProjectID)[0].thoi_gian_lam.map((item, index) => (<Select.Option key={item.id} value={item.id}>{item.gio_vao} - {item.gio_ra}</Select.Option>))}
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
                      onClick={() => checkLogin() }
                      block
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
                  onClick={() => checkBreak() }
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
              />
            </Form.Item>
            <Form.Item
              name="time_resume"
              className="formItemHome"
              label={
                <Button
                  className="textContent"
                  type="dashed"
                  onClick={() => checkResume() }
                  block
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
              />
            </Form.Item>
            <Form.Item
              name="time_leaves"
              className="formItemHome"
              label={
                <Button
                  className="textContent"
                  type="dashed"
                  onClick={() => checkLeaves() }
                  block
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
              />
            </Form.Item>
            <Form.Item
              name="time_logout"
              className="formItemHome"
              label={
                <Button
                  className="textContent"
                  type="dashed"
                  onClick={() => checkLogout() }
                  block
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
              />
            </Form.Item>
            <Form.Item
              name="disabled"
              className="formItemHomeText"
              style={{ marginBottom: "24px" }}
            >
              <Row>
                <Col span={24}>
                  <div
                    style={
                      {
                        // border: "1px solid lightgray",
                        // background: "#fff",
                      }
                    }
                  >
                    {/* <div ref={quillRef} /> */}
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        minHeight: "80px",
                        borderRadius: "10px",
                        border: "none",
                      }}
                      placeholder="Hello"
                      disabled={checkShifts}
                    />
                  </div>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              name="disabled"
              className="formItemHome"
              style={{ marginBottom: "24px" }}
            >
              <Upload
                name="uploadFile"
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
              className="formItemHome"
              style={{ textAlign: "center" }}
            >
              <Button
                type="primary"
                shape="round"
                className="btnSendHome"
                htmlType="submit"
                icon={<SendOutlined />}
              >
                Send
              </Button>
            </Form.Item>

            {/* <Col span={4}></Col> */}
            {/* <Col span={16} className="tableContent"> */}
            {/* <Row className="tableContent">
                      <Col span={5}>
                        <button
                          className="textContent"
                          onClick={() => setNewDay(moment())}
                        >
                          Login
                        </button>
                      </Col>
                      <Col span={19}>
                        <DatePicker
                          // showTime
                          onChange={onChange}
                          onOk={onOk}
                          className="rightContent"
                          disabledDate={disabledDate}
                          format={dateFormat}
                          value={newDay}
                          disabled
                        />
                      </Col>
                      <Col span={5}>
                        <button
                          className="textContent"
                          onClick={() => setNewDay1(moment())}
                        >
                          Text a break
                        </button>
                      </Col>
                      <Col span={19}>
                        <DatePicker
                          // showTime
                          onChange={onChange1}
                          onOk={onOk}
                          className="rightContent"
                          disabledDate={disabledDate}
                          format={dateFormat}
                          value={newDay1}
                        />
                      </Col>
                      <Col span={5}>
                        <button
                          className="textContent"
                          onClick={() => setNewDay2(moment())}
                        >
                          Restart
                        </button>
                      </Col>
                      <Col span={19}>
                        <DatePicker
                          // showTime
                          onChange={onChange2}
                          onOk={onOk}
                          className="rightContent"
                          disabledDate={disabledDate}
                          format={dateFormat}
                          value={newDay2}
                        />
                      </Col>
                      <Col span={5}>
                        <button
                          className="textContent"
                          onClick={() => setNewDay3(moment())}
                        >
                          Text a break
                        </button>
                      </Col>
                      <Col span={19}>
                        <DatePicker
                          // showTime
                          onChange={onChange3}
                          onOk={onOk}
                          className="rightContent"
                          disabledDate={disabledDate}
                          format={dateFormat}
                          value={newDay3}
                        />
                      </Col>
                      <Col span={5}>
                        <button className="textContent1">
                          Request a leave
                        </button>
                      </Col>
                      <Col span={19}>
                        <TimePicker.RangePicker
                          use12Hours
                          format="h:mm A"
                          className="rightContent"
                        />
                      </Col>
                      <Col span={24}>
                        <div
                          style={{
                            width: "100%",
                            border: "1px solid lightgray",
                            background: "#fff",
                          }}
                        >
                          <div ref={quillRef} />
                        </div>
                      </Col>
                      <Col span={24}>
                        <Upload
                          name="uploadFile"
                          beforeUpload={beforeUpload}
                          accept="image/png, image/jpeg, .pdf"
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        >
                          <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button>
                        </Upload>
                      </Col>
                      <Col span={24}>
                        <Button
                          type="primary"
                          shape="round"
                          className="btnSendHome"
                          // icon={<DownloadOutlined />}
                        >
                          Send
                        </Button>
                      </Col>
                    </Row> */}
            {/* </Col> */}
            {/* <Col span={4}></Col> */}
          </Form>
        </div>
      </div>
      </div >
    {/* </Col> */ }
  {/* <Col span={8}></Col> */ }
    </Row >
    );
}

export default Home;
