import { EditOutlined } from "@ant-design/icons";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const ModalAdd = ({
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const onCloseModal = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="ADD CUSTOMER"
      visible={visible}
      onCancel={onCloseModal}
      width={700}
      footer={false}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // validateMessages={validateMessages}
        initialValues={{
          remember: true,
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Customer"
              name="Customer"
              rules={[{ required: true, type: "string" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="Address"
              rules={[{ required: true, type: "string" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Phone Number"
              name="Phone"
            >
              <Input maxLength={15} pattern="[0-9]*" title="Chỉ nhập ký tự từ 0 đến 9"/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          // wrapperCol={{ offset: 6, span: 12 }}
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <LoadingButton
            type="success"
            // htmlType="submit"
            style={{ marginRight: "20px" }}
            className={"m-2"}
            variant="contained"
          >
            Add new
          </LoadingButton>
          <Button onClick={onCloseModal} color="error" variant="contained">Exit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalEdit = ({
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const onCloseModal = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="EDIT CUSTOMER"
      visible={visible}
      onCancel={onCloseModal}
      width={700}
      footer={false}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // validateMessages={validateMessages}
        initialValues={{
          remember: true,
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Customer"
              name="Customer"
              rules={[{ required: true, type: "string" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="Address"
              rules={[{ required: true, type: "string" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Phone Number"
              name="Phone"
            >
              <Input maxLength={15} pattern="[0-9]*" title="Chỉ nhập ký tự từ 0 đến 9"/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          // wrapperCol={{ offset: 6, span: 12 }}
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <LoadingButton
            type="success"
            // htmlType="submit"
            style={{ marginRight: "20px" }}
            className={"m-2"}
            variant="contained"
          >
            Update
          </LoadingButton>
          <Button onClick={onCloseModal} color="error" variant="contained">Exit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

function SuperAdminCustomer() {
  const [loading, setLoading] = useState(false);
  const [isShowAddProject, setIsShowAddProject] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const defaultPageSize = 10;
  const [pager, setPager] = useState({
    pageSize: defaultPageSize,
    count: 0,
    current: 1,
  });
  // const [data, setData] = useState([]);

  const onShowModalEdit = (record) => {
    // GetProjectEditApi(record.id)
      // .then((res) => {
        // setDataInforUser(res.data);
        setIsEditing(true);
      // })
      // .catch((err) => {
        // if (err.data.error) {
          // openNotificationWithIcon("error", err.data.error);
        // }
      // });
  };

  const renderDetailsButton = (record) => {
    return (
      <Box sx={{ width: "100%" }}>
        <Grid container columns={12}>
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <span
              title="Edit"
              className={"col-6"}
              style={{ color: "#4290d3", cursor: "pointer" }}
              onClick={() => onShowModalEdit(record)}
            >
              <EditOutlined />
            </span>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "customer",
      headerName: "Customer",
      // headerAlign: "center",
      // align: "center",
      width: 600,
      sortable: false,
    },
    {
      field: "Number_of_members",
      headerName: "Number of members",
      headerAlign: "center",
      align: "center",
      width: 250,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      width: 100,
      sortable: false,
      renderCell: renderDetailsButton,
    },
  ];

  const data = [
    { id: 1, customer: "Công Ty Tnhh Thin Group", Number_of_members: "1", age: 35 },
    {
      id: 2,
      customer: "CÔNG TY TNHH VẬN TẢI QUANG MINH CHI",
      Number_of_members: "2",
      age: 42,
    },
    {
      id: 3,
      customer: "CÔNG TY TNHH TƯ VẤN KHẢO SÁT ĐO ĐẠC XÂY DỰNG QUÂN PHÁT",
      Number_of_members: "3",
      age: 45,
    },
    {
      id: 4,
      customer: "CÔNG TY TNHH TƯ VẤN THIẾT KẾ LK INTERNATIONAL",
      Number_of_members: "4",
      age: 16,
    },
    {
      id: 5,
      customer: "CÔNG TY TNHH NIPPON TSUBASA EDUCATION",
      Number_of_members: "5",
      age: null,
    },
    {
      id: 6,
      customer: "CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ VINAFA",
      Number_of_members: "6",
      age: 150,
    },
    {
      id: 7,
      customer: "CÔNG TY TNHH ĐẦU TƯ & PHÁT TRIỂN HOÀNG KHANH",
      Number_of_members: "7",
      age: 44,
    },
    {
      id: 8,
      customer:
        "CÔNG TY TNHH THƯƠNG MẠI VÀ XUẤT NHẬP KHẨU PHÚ NHUẬN FOOD ĐÀ NẴNG",
      Number_of_members: "8",
      age: 36,
    },
    {
      id: 9,
      customer: "CÔNG TY TNHH DU LỊCH DỊCH VỤ THƯƠNG MẠI ĐẠI HOA",
      Number_of_members: "9",
      age: 65,
    },
  ];

  return (
    <div className="FormHomeTable">
      <div className="FormProject1">
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
                  <ControlPointIcon style={{marginRight: "5px"}}/> Add New
                </Button>
              </Col>
            </Row>
          </div>
          <div className="tableAdmin">
            <DataGrid
              // loading={loading}
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              autoHeight={true}
              disableColumnMenu={true}
            />
          </div>
          <ModalAdd
            visible={isShowAddProject}
            onCancel={() => setIsShowAddProject(false)}
            loading={loading}
          />
          <ModalEdit
            visible={isEditing}
            onCancel={() => setIsEditing(false)}
            // dataInforUser={dataInforUser}
            // lsNameUser={lsNameUser}
            // lsNameUser1={lsNameUser}
            // fetchDataProject={fetchDataProject}
            // pager={pager}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default SuperAdminCustomer;
