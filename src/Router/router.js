import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import UserLayout from '../containers/UserLayout';
import Login from '../containers/Login';
import Cookies from "universal-cookie";
import NotPermission from "../containers/notPermission";
import NotFoundLayout from "../containers/notfound";
import { NotValidTime } from "../containers/notValidTime";
import { CustomLayout } from "../containers/Layout";
import { authSuccess } from "../app/Actions/auth";

import { getUserInfo } from '../app/Reducers/getUserInfo';

import Home from '../containers/component/Home';
import ThongTinCaNhan from '../containers/component/ThongTinCaNhan';
import User from '../containers/component/User';
import WorkingDetails from '../containers/component/WorkingDetails';

const cookies = new Cookies();

function Main() {
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(true);
    const token = cookies.get('token');
    if (token) {
        dispatch(authSuccess(token));
    }
    const auth = useSelector(state => state.auth.token) !== null;
    // const userInfo = useSelector(state => state.getUserInfo.userInfo);
    useEffect(() => {
        if (auth && token) {
            dispatch(getUserInfo());
            // dispatch(getSystemInfo(token));
            // dispatch(getSystemStatus(token));
            // dispatch(getSystemOTStatus(token));
        }
    }, [auth, token])

    return (
        <Router>
            <Switch>
                <ProtectLoginRoute exact path='/Login' protect={auth}>
                    <UserLayout>
                        <Login />
                    </UserLayout>
                </ProtectLoginRoute>
                <RouteWithLayout
                    component={Home}
                    exact
                    layout={CustomLayout}
                    path="/"
                    isPrivate={true}
                    lsPermissions={['']}
                    permission={['']}
                    isLogged={auth}
                    isValid={isValid}
                />
                <RouteWithLayout
                    component={Home}
                    exact
                    layout={CustomLayout}
                    path="/home"
                    isPrivate={true}
                    lsPermissions={['']}
                    permission={['']}
                    isLogged={auth}
                    isValid={isValid}
                />
                <RouteWithLayout
                    component={ThongTinCaNhan}
                    exact
                    layout={CustomLayout}
                    path="/personal_information"
                    isPrivate={true}
                    lsPermissions={['']}
                    permission={['']}
                    isLogged={auth}
                    isValid={isValid}
                />
                <RouteWithLayout
                    component={User}
                    exact
                    layout={CustomLayout}
                    path="/admin"
                    isPrivate={true}
                    lsPermissions={['']}
                    permission={['']}
                    isLogged={auth}
                    isValid={isValid}
                />
                <RouteWithLayout
                    component={WorkingDetails}
                    exact
                    layout={CustomLayout}
                    path="/working_details"
                    isPrivate={true}
                    lsPermissions={['']}
                    permission={['']}
                    isLogged={auth}
                    isValid={isValid}
                />
            </Switch>
        </Router>
    )
}

const RouteWithLayout = props => {
    const { layout: Layout, isLogged: isLogged, component: Component, isPrivate: isPrivate, isValid: isValid, lsPermissions: lsPermissions, permission: permission, ...rest } = props;
    const getRejectRoute = (type) => {
        switch (type) {
            case '403': return <NotPermission />
            case '404': return <NotFoundLayout />
            default: return <NotPermission />
        }
    }
    return (
        <Route
            {...rest}
            render={() =>
                isValid ?
                    (isPrivate ? (
                        isLogged ?
                            (lsPermissions && lsPermissions.length > 0 ?
                                (lsPermissions.some(r => permission.includes(r)) ?
                                    <Layout isLogged={isLogged}>
                                        <Component {...props} />
                                    </Layout>
                                    :
                                    getRejectRoute(permission)
                                )
                                :
                                (<span></span>)
                            )
                            : (
                                <Redirect
                                    to={{
                                        pathname: "/login",
                                        state: { from: props.location }
                                    }}
                                />
                            )
                    ) : (
                        <Layout isLogged={isLogged}>
                            <Component {...props} />
                        </Layout>
                    ))
                    : (
                        <NotValidTime isValid={isValid} />
                    )
            }
        />
    )
}

const ProtectLoginRoute = ({ protect, children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => !protect ? (

                children
            ) :
                (
                    <Redirect to='/home'></Redirect>
                )
            }
        />
    )
}

export default Main;