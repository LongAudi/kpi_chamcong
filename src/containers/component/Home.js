import React, { useContext, useEffect, useRef, useState } from "react";
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
} from "antd";
import moment from "moment";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";

const { Content } = Layout;
// const { RangePicker } = DatePicker;
const { Dragger } = Upload;

function Home() {
  const [dataSource, setDataSource] = useState([]);
  const [newDay, setNewDay] = useState();
  const [newDay1, setNewDay1] = useState();
  const [newDay2, setNewDay2] = useState();
  const [newDay3, setNewDay3] = useState();
  const [fileList, setFileList] = useState([]);

  const onChange = (value, dateString) => {
    setNewDay(value);
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onChange1 = (value1, dateString) => {
    setNewDay1(value1);
    console.log("Selected Time: ", value1);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onChange2 = (value2, dateString) => {
    setNewDay2(value2);
    console.log("Selected Time: ", value2);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onChange3 = (value3, dateString) => {
    setNewDay3(value3);
    console.log("Selected Time: ", value3);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
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
    console.log(isJpgOrPng);
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
    <div>
      <Content className="contentHome">
        <div className="rowContent">
          <Row>
            <Col span={7}></Col>
            <Col span={10}>
              <Form>
                <Form.Item name="Upload">
                  <Row>
                    {/* <Col span={4}></Col> */}
                    {/* <Col span={16} className="tableContent"> */}
                    <Row className="tableContent">
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
                    </Row>
                    {/* </Col> */}
                    {/* <Col span={4}></Col> */}
                  </Row>
                </Form.Item>
              </Form>
            </Col>
            <Col span={7}></Col>
          </Row>
        </div>
      </Content>
    </div>
  );
}

export default Home;
