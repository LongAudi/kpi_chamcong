import React, { useEffect, useState } from "react";
import { Row, Col, Select, Form } from "antd";
import { errorHandle, openNotificationWithIcon, toSlug } from "../Function";
import {
  GetListUserApi,
  GetRoleApi,
  GetUserEditApi,
  PostUserApi,
  PutLockUserApi,
  PutUserApi,
} from "../../api/usersApi";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Portal,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";

const { Option } = Select;
const validateMessages = {
  required: "Please enter your ${label} !",
  types: {
    email: "${label} is not in the correct email format!",
    number: "${label} not numbers!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Mail() {
  const defaultPageSize = 10;
  const [pager, setPager] = useState({
    pageSize: defaultPageSize,
    count: 0,
    current: 1,
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lsRole, setLsRole] = useState([]);
  const [dataInforUser, setDataInforUser] = useState([]);
  const [lsNameUser, setLsNameUser] = useState([]);
  const [form] = Form.useForm();

  const showModalAddUser = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
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

  const fetchListChucVu = () => {
    GetRoleApi().then((res) => {
      // console.log(res);
      setLsRole(res.data);
    });
  };

  const fetchListUserName = () => {
    GetListUserApi().then((res) => {
      setLsNameUser(res.data);
    });
  };

  useEffect(() => {
    // console.log(1);
    fetchData({ page: pager.current, page_size: pager.pageSize, search });
    fetchListChucVu();
    fetchListUserName();
  }, []);

  const onShowModalEdit = (record) => {
    GetUserEditApi(record.id)
      .then((re) => {
        setDataInforUser(re.data);
        setIsEditing(true);
      })
      .catch((err) => {
        if (err.data.error) {
          openNotificationWithIcon("error", err.data.error);
        }
      });
  };

  const onLock_Unlock = (record) => {
    console.log(record.id);
    PutLockUserApi({
      userId: record.id,
      block: "true",
      is_active: !record.is_active,
    })
      .then((r) => {
        fetchData({ page: pager.current, page_size: pager.pageSize, search });
      })
      .catch((err) => {
        if (err.data.error) {
          openNotificationWithIcon("error", err.data.error);
        }
      });
  };

  const columns = [
    {
      field: "index",
      headerName: "ID",
      width: 100,
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    { field: "username", headerName: "UserName", width: 250, sortable: false },
    {
      field: "content",
      headerAlign: "center",
      headerName: "Content",
      width: 900,
      sortable: false,
    },
    {
      field: "date_joined",
      headerName: "Date Join",
      width: 200,
      valueGetter: (value, record) =>
        value ? moment(value).format("DD/MM") : "N/A",
      sortable: false,
      headerAlign: "right",
      align: "right",
    },
  ];

  const styles = {
    // position: "fixed",
    width: 500,
    height: 600,
    // top: "73%",
    // left: "84%",
    // transform: "translate(-50%, -50%)",
    border: "1px solid #333",
    // p: 1,
    // bgcolor: "background.paper",
    bottom: 16,
    right: 16,
    position: "absolute",
    bgcolor: "background.paper",
  };

  return (
    <div className="FormHomeTable">
      <div className="FormHome1">
        <div className="FormHome2">
          <div className="HeaderContentUser">
            <Row style={{ width: "100%" }}>
              <Col span={12}>{/* <h1 className="h1UserTable"></h1> */}</Col>
              <Col span={12}>
                <Button className="btnAddUser" onClick={showModalAddUser}>
                  <EditIcon style={{ marginRight: "5px" }} /> Compose
                </Button>
                {isModalVisible ? (
                  <Portal>
                    <Box sx={styles} className="BoxMail">
                      <BootstrapDialogTitle
                        id="customized-dialog-title"
                        onClose={handleClose}
                      >
                        New Message
                      </BootstrapDialogTitle>
                      <Form
                        form={form}
                        layout="vertical"
                        autoComplete="off"
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        validateMessages={validateMessages}
                        initialValues={{
                          remember: true,
                        }}
                      >
                        <DialogContent dividers className="DialogContentMail">
                          <Form.Item
                            name="Email"
                            rules={[{ required: true, type: "string" }]}
                          >
                            <Input
                              id="input-with-icon-adornment"
                              startAdornment={
                                <InputAdornment position="start">
                                  To
                                </InputAdornment>
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            name="comment"
                            style={{ marginTop: "24px" }}
                          >
                            <TextareaAutosize
                              maxRows={4}
                              className="TextareaAutosizeMail style-6"
                              aria-label="maximum height"
                              placeholder="Content"
                              maxLength={500}
                            />
                          </Form.Item>
                          <Alert severity="error">
                            Use 500 characters or less!
                          </Alert>
                        </DialogContent>
                      </Form>

                      <DialogActions>
                        <Form.Item>
                          <LoadingButton
                            type="success"
                            // htmlType="submit"
                            style={{ marginRight: "20px" }}
                            className={"m-2"}
                            variant="contained"
                            endIcon={<SendIcon />}
                          >
                            Send
                          </LoadingButton>
                        </Form.Item>
                      </DialogActions>
                    </Box>
                  </Portal>
                ) : null}
              </Col>
            </Row>
          </div>
          <div className="tableAdmin">
            <DataGrid
              loading={loading}
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              autoHeight={true}
              disableColumnMenu={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mail;
