import React, { useState } from "react";
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
} from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";

const { Content } = Layout;
// const { RangePicker } = DatePicker;

function Home() {
  const [newDay, setNewDay] = useState();
  const [newDay1, setNewDay1] = useState();
  const [newDay2, setNewDay2] = useState();
  const [newDay3, setNewDay3] = useState();

  const onChange = (value, dateString) => {
    setNewDay(value);
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
  };

  const onChange1 = (value1, dateString) => {
    setNewDay1(value1);
    // console.log("Selected Time: ", value1);
    // console.log("Formatted Selected Time: ", dateString);
  };

  const onChange2 = (value2, dateString) => {
    setNewDay2(value2);
    // console.log("Selected Time: ", value2);
    // console.log("Formatted Selected Time: ", dateString);
  };

  const onChange3 = (value3, dateString) => {
    setNewDay3(value3);
    // console.log("Selected Time: ", value3);
    // console.log("Formatted Selected Time: ", dateString);
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
      file.type !== "image/jpeg";
    // console.log(isJpgOrPng);
    if (isJpgOrPng) {
      message.error("You can only upload PDF/PNG file!");
    }

    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
      message.error("Image must smaller than 100MB!");
    }

    return isJpgOrPng && isLt2M;
  };

  return (
    <Row>
      {/* <Col span={8}></Col> */}
      {/* <Col span={8}> */}
      <div className="FormHome">
        <div className="FormHome1">
          {/* <h1>Hello</h1> */}
          <div className="FormHome2">
            <Form
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
            >
              <Form.Item
                name="disabled"
                valuePropName="checked"
                className="formItemHome"
                style={{ marginBottom: "24px" }}
              >
                <Row>
                  <Col span={16}>
                    <TreeSelect
                      treeDataSimpleMode
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                        minWidth: 300,
                      }}
                      placeholder="
                      Please select project name"
                      onChange={onChange}
                    />
                  </Col>
                  <Col span={6} offset={2}>
                    <TreeSelect
                      treeDataSimpleMode
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                        minWidth: 150,
                      }}
                      placeholder="Please choose a session"
                      onChange={onChange}
                      className="TreeSelectHomeTime"
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                name="disabled"
                valuePropName="checked"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    onClick={() => setNewDay(moment())}
                    block
                  >
                    Login
                  </Button>
                }
                style={{ marginBottom: "24px" }}
              >
                <DatePicker
                  // showTime
                  onChange={onChange}
                  onOk={onOk}
                  className="rightContent"
                  disabledDate={disabledDate}
                  format={dateFormat}
                  value={newDay}
                  disabled
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="disabled"
                valuePropName="checked"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    block
                    onClick={() => setNewDay1(moment())}
                  >
                    Take a break
                  </Button>
                }
                style={{ marginBottom: "24px" }}
              >
                <DatePicker
                  // showTime
                  onChange={onChange1}
                  onOk={onOk}
                  className="rightContent"
                  disabledDate={disabledDate}
                  format={dateFormat}
                  value={newDay1}
                  open={false}
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="disabled"
                valuePropName="checked"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    onClick={() => setNewDay2(moment())}
                    block
                  >
                    Resume
                  </Button>
                }
                style={{ marginBottom: "24px" }}
              >
                <DatePicker
                  // showTime
                  onChange={onChange2}
                  onOk={onOk}
                  className="rightContent"
                  disabledDate={disabledDate}
                  format={dateFormat}
                  value={newDay2}
                  open={false}
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="disabled"
                valuePropName="checked"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    onClick={() => setNewDay3(moment())}
                    block
                  >
                    Take a break
                  </Button>
                }
                style={{ marginBottom: "24px" }}
              >
                <DatePicker
                  // showTime
                  onChange={onChange3}
                  onOk={onOk}
                  className="rightContent"
                  disabledDate={disabledDate}
                  format={dateFormat}
                  value={newDay3}
                  open={false}
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="disabled"
                valuePropName="checked"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    onClick={() => setNewDay(moment())}
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
                name="disabled"
                valuePropName="checked"
                className="formItemHome"
                label={
                  <Button
                    className="textContent"
                    type="dashed"
                    onClick={() => setNewDay(moment())}
                    block
                  >
                    Logout
                  </Button>
                }
                style={{ marginBottom: "24px" }}
              >
                <DatePicker
                  // showTime
                  onChange={onChange}
                  onOk={onOk}
                  className="rightContent"
                  disabledDate={disabledDate}
                  format={dateFormat}
                  value={newDay}
                  disabled
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="disabled"
                valuePropName="checked"
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
                      />
                    </div>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                name="disabled"
                valuePropName="checked"
                className="formItemHome"
                style={{ marginBottom: "24px" }}
              >
                <Upload
                  name="uploadFile"
                  beforeUpload={beforeUpload}
                  accept="image/png, image/jpeg, .pdf"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="disabled"
                valuePropName="checked"
                className="formItemHome"
              >
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
      </div>
      {/* </Col> */}
      {/* <Col span={8}></Col> */}
    </Row>
  );
}

export default Home;
