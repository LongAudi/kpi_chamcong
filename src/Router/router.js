import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserLayout from "../containers/UserLayout";
import Login from "../containers/Login";
import Cookies from "universal-cookie";
import NotPermission from "../containers/notPermission";
import LoadingPage from "../containers/loadingpage";
import NotFoundLayout from "../containers/notfound";
import { NotValidTime } from "../containers/notValidTime";
import { CustomLayout } from "../containers/Layout";
import { authSuccess } from "../app/Actions/auth";

import { getUserInfo } from "../app/Reducers/getUserInfo";

import Home from "../containers/component/Home";
import ThongTinCaNhan from "../containers/component/ThongTinCaNhan";
import User from "../containers/component/User";
import WorkingDetails from "../containers/component/WorkingDetails";
import ProjectManagement from "../containers/component/ProjectManagement";

const cookies = new Cookies();

function Main() {
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.getUserInfo.userInfo);
  const [isValid, setIsValid] = useState(true);
  const [lsPermissions, setLsPermissions] = useState(['Member']);
  
  const token = cookies.get("token");
  if (token) {
    dispatch(authSuccess(token));
  }
  const auth = useSelector((state) => state.auth.token) !== null;
  const userInfo = useSelector(state => state.getUserInfo.userInfo);
  useEffect(() => {
    if (auth && token) {
      dispatch(getUserInfo());
    }
  }, [auth, token]);

  useEffect(()=>{
    if (userInfo){

      setLsPermissions([userInfo.group_name])

    //     if (userInfo.team_permissions){
    //         const arrTeam = userInfo.team_permissions .map((item,index)=>item.phanquyen__ten_pq);
    //         setLsPermissions([...userInfo.user_permissions, ...new Set(arrTeam)]);
    //     } else {
    //         setLsPermissions(userInfo.user_permissions)
    //     }
    }
    // console.log(userInfoURL);
    // if (userInfo && userInfo.user_permissions) {
    //     setLsPermissions(userInfo.user_permissions)
    // }
    // authAxios().get(userInfoURL).then(r=>{
    //     console.log(r.data.user_permissions);
    //     setLsPermissions(r.data.user_permissions);
    // })
  },[userInfo])

  return (
    <Router>
      <Switch>
        <ProtectLoginRoute exact path="/Login" protect={auth} user_info={userInfo}>
          <UserLayout >
            <Login />
          </UserLayout>
        </ProtectLoginRoute>

        <RouteWithLayout
          component={Home}
          exact
          layout={CustomLayout}
          path="/"
          isPrivate={true}
          lsPermissions={lsPermissions}
          permission={["Admin","Member"]}
          isLogged={auth}
          isValid={isValid}
        />
        <RouteWithLayout
          component={Home}
          exact
          layout={CustomLayout}
          path="/home"
          isPrivate={true}
          lsPermissions={lsPermissions}
          permission={["Member"]}
          isLogged={auth}
          isValid={isValid}
        />
        <RouteWithLayout
          component={User}
          exact
          layout={CustomLayout}
          path="/admin"
          isPrivate={true}
          lsPermissions={lsPermissions}
          permission={["Admin"]}
          isLogged={auth}
          isValid={isValid}
        />
        <RouteWithLayout
          component={WorkingDetails}
          exact
          layout={CustomLayout}
          path="/working_details"
          isPrivate={true}
          lsPermissions={lsPermissions}
          permission={['Member']}
          isLogged={auth}
          isValid={isValid}
        />
        <RouteWithLayout
          component={ProjectManagement}
          exact
          layout={CustomLayout}
          path="/project_management"
          isPrivate={true}
          lsPermissions={lsPermissions}
          permission={["Admin"]}
          isLogged={auth}
          isValid={isValid}
        />
        <RouteWithLayout
          component={ThongTinCaNhan}
          exact
          layout={CustomLayout}
          path="/personal_information"
          isPrivate={true}
          lsPermissions={lsPermissions}
          permission={["Admin",'Member']}
          isLogged={auth}
          isValid={isValid}
        />
        <RouteWithLayout
            component={NotPermission}
              exact
              layout={CustomLayout}
              path="/notpermission"
              isPrivate={true}
              lsPermissions={lsPermissions}
              permission={'403'}
              isLogged={auth}
            isValid={isValid}
        />
        <RouteWithLayout
            component={NotFoundLayout}
              layout={CustomLayout}
              path="/"
              lsPermissions={lsPermissions}
              isPrivate={true}
              isLogged={auth}
            permission={'404'}
            isValid={isValid}
        />
      </Switch>
    </Router>
  );
}

const RouteWithLayout = (props) => {
  const {
    layout: Layout,
    isLogged: isLogged,
    component: Component,
    isPrivate: isPrivate,
    isValid: isValid,
    lsPermissions: lsPermissions,
    permission: permission,
    path: path,
    ...rest
  } = props;


  const getRejectRoute = (type) => {
    switch (type) {
      case "403":
        return <NotPermission />;
      case "404":
        return <NotFoundLayout />;
      default:
        // return <NotPermission />;
        return <LoadingPage />;
    }
  };

  return (
    <Route
      {...rest}
      render={() =>
        isValid ? (
          isPrivate ? (
            isLogged ? (
              lsPermissions && lsPermissions.length > 0 ? 
                (lsPermissions.some((r) => permission.includes(r)) ? (
                  // Nếu là Admin thì chuyển về /admin
                  path == "/" && lsPermissions.includes('Admin') ? <Redirect to="/admin"></Redirect> :
                  <Layout isLogged={isLogged}>
                    <Component {...props} />
                  </Layout>
                ) : (
                   getRejectRoute(permission)
                  // lsPermissions.includes('Admin') ? <Redirect to="/admin"></Redirect> : getRejectRoute(permission)
                )
                )
               : (
                <span></span>
              )
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            )
          ) : (
            <Layout isLogged={isLogged}>
              <Component {...props} />
            </Layout>
          )
        ) : (
          <NotValidTime isValid={isValid} />
        )
      }
    />
  );
};

const ProtectLoginRoute = ({ protect, user_info, children, ...rest }) => {
  return (
    <>
    <Route
      {...rest}
      render={() =>
        !protect ? children : <Redirect to="/"></Redirect>
      }
    />
    </>

  );
};

export default Main;
