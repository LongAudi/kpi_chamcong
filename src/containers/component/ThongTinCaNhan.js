import { Tabs, Descriptions } from "antd";
import {} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { UserInfoUrlApi } from "../../api/usersApi";
import {
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Paper,
  Typography,
  Button,
  Avatar,
  Card,
  Box,
  Grid,
  Tab,
  Badge,
  styled,
  CardMedia,
} from "@mui/material";
import { AccountCircle, Favorite } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { red } from "@mui/material/colors";

const { TabPane } = Tabs;

function dateFormat(inputDate, format) {
  if (inputDate == null) {
    return "";
  } else if (inputDate != null) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
  }
}
function changeAvatar(gender) {
  if (gender == "male") {
    return (
      <Avatar aria-label="recipe" src="">
        A
      </Avatar>
    );
  } else if (gender == "female") {
    return (
      <Avatar aria-label="recipe" src="">
        A
      </Avatar>
    );
  }
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function ThongTinCaNhan() {
  const [thongtinTK, setThongtinTK] = useState([]);

  const fetchDataTK = (params = {}) => {
    UserInfoUrlApi(params).then((res) => {
      console.log(res.data);
      setThongtinTK(res.data);
    });
  };

  useEffect(() => {
    fetchDataTK();
  }, []);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "64px" }}>
      <Paper elevation={24} sx={{ borderRadius: "30px" }}>
        <CardContent>
          <Grid container spacing-xs={3}>
            <Grid item xs={12}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label="ProFile"
                      value="1"
                      icon={<AccountCircle />}
                      iconPosition="start"
                    />
                    {/* <Tab
                      label="ProFile"
                      value="2"
                      icon={<AccountCircle />}
                      iconPosition="start"
                    /> */}
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box>
                    <Grid container spacing-xs={3} columns={12} sx={{}}>
                      <Grid
                        xs={12}
                        lg={4}
                        sx={{
                          marginTop: "12px",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                        }}
                      >
                        <Card>
                          <CardHeader
                            avatar={
                              <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                variant="dot"
                              >
                                <Avatar
                                  sx={{ width: 48, height: 48 }}
                                  aria-label="recipe"
                                  src="https://cdna.artstation.com/p/assets/images/images/049/550/596/large/wlop-2se.jpg?1652764144"
                                ></Avatar>
                                {/* <Avatar
                                   sx={{ width: 64, height: 64 }}
                                  src="https://cdna.artstation.com/p/assets/images/images/049/550/596/large/wlop-2se.jpg?1652764144"
                                /> */}
                              </StyledBadge>
                            }
                            // action={
                            //   <IconButton aria-label="settings">
                            //     <MoreVert />
                            //   </IconButton>
                            // }
                            title={
                              thongtinTK.last_name + " " + thongtinTK.first_name
                            }
                            subheader={thongtinTK.group_name}
                          />
                          {/* <CardContent>
                            <Button>
                              <Typography>{thongtinTK.email}</Typography>
                            </Button>
                          </CardContent> */}
                          {/* <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                              <Favorite sx={{ color: red[300] }} />
                            </IconButton>
                          </CardActions> */}
                        </Card>
                      </Grid>
                      <Grid
                        xs={12}
                        lg={8}
                        sx={{
                          marginTop: "12px",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                        }}
                      >
                        <Grid xs={12}>
                          <Card>
                            <CardHeader
                              title={<Typography>Personal Details</Typography>}
                            />
                            <CardContent>
                              <Descriptions column={1}>
                                <Descriptions.Item label="Username">
                                  {thongtinTK.username}
                                </Descriptions.Item>
                                <Descriptions.Item label="Full Name">
                                  {thongtinTK.last_name +
                                    " " +
                                    thongtinTK.first_name}
                                </Descriptions.Item>
                                <Descriptions.Item label="Email">
                                  {thongtinTK.email}
                                </Descriptions.Item>
                                <Descriptions.Item label="BirthDay">
                                  {dateFormat(
                                    thongtinTK.birthday,
                                    "dd-MM-yyyy"
                                  )}
                                </Descriptions.Item>
                              </Descriptions>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid xs={12} sx={{ marginTop: "12px" }}>
                          <Card>
                            <CardHeader
                              title={<Typography>Details Join</Typography>}
                            />
                            <CardContent>
                              <Descriptions column={1}>
                                <Descriptions.Item label="Date Join">
                                  {dateFormat(
                                    thongtinTK.date_joined,
                                    "dd-MM-yyyy"
                                  )}
                                </Descriptions.Item>
                                <Descriptions.Item label="Academic Level">
                                  {thongtinTK.academic_level}
                                </Descriptions.Item>
                                <Descriptions.Item label="Current Salary">
                                  {thongtinTK.currrent_salary}
                                </Descriptions.Item>
                                <Descriptions.Item label="Customer">
                                  {thongtinTK.customer}
                                </Descriptions.Item>
                                <Descriptions.Item label="Role">
                                  {thongtinTK.group_name}
                                </Descriptions.Item>
                              </Descriptions>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
                {/* <TabPanel value="2">
                  <Button>Change</Button>
                </TabPanel> */}
              </TabContext>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </Container>
  );
}
