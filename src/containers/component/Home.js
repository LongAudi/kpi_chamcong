import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Col,
  Layout,
  Row,
  DatePicker,
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Upload,
  message,
} from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import { RichTextField } from "mui-quill";
import "react-quill/dist/quill.snow.css";

const { Content } = Layout;
const { RangePicker } = DatePicker;

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

function Home() {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(1);
  const [newDay, setNewDay] = useState();
  const [newDay1, setNewDay1] = useState();
  const [newDay2, setNewDay2] = useState();
  const [newDay3, setNewDay3] = useState();
  const [value, setValue] = useState("");

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

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    console.log(newData);
    setDataSource(newData);
  };

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "50%",
      editable: true,
    },
    {
      title: "Upload",
      dataIndex: "age",
      width: "30%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload file</Button>
          </Upload>
        ) : null,
    },
    // {
    //   title: "address",
    //   dataIndex: "address",
    // },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "20%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Task ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Content className="contentHome">
        <div className="tableContent">
          <div className="rowContent">
            <Row>
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
                <button className="textContent">Request a leave</button>
              </Col>
              <Col span={19}>
                <RangePicker
                  className="rightContent"
                  disabledDate={disabledDate}
                  format={dateFormat}
                />
              </Col>
              <Col span={5}>
                <div className="textContent">Report</div>
              </Col>
              <Col span={19}>
                <Button type="primary" onClick={handleAdd}>
                  CREATE REPORT
                </Button>
              </Col>
              <Col span={24}>
                <RichTextField
                  className="richTextField"
                  value={value}
                  onChange={(nextValue) => setValue(nextValue)}
                  variant="outlined"
                  options={{
                    toolbar: true,
                  }}
                />
              </Col>
              {/* <Col span={24}>
                <RichTextField
                  className="richTextField"
                  value={value}
                  onChange={(nextValue) => setValue(nextValue)}
                  variant="outlined"
                  options={{
                    toolbar: true,
                  }}
                />
              </Col>
              <Col span={24}>
                <RichTextField
                  className="richTextField"
                  value={value}
                  onChange={(nextValue) => setValue(nextValue)}
                  variant="outlined"
                  options={{
                    toolbar: true,
                  }}
                />
              </Col> */}
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
          </div>
        </div>
      </Content>
    </div>
  );
}

export default Home;
