import React from "react";
import {Menu, Image,} from 'antd';
import {
    PoweroffOutlined
} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {
    logoutURL,
} from "../constants";
import moment from "moment";
import 'moment/locale/vi';
import Cookies from 'universal-cookie';
import {authAxios} from "../api/axiosClient";
import {logout} from "../app/Actions/auth";
import Navbar from "./navbar/Navbar";

moment.locale('vi');

const cookies = new Cookies();
const logo = require('../images/VBPO_Logo.png').default;
const LogoImage = () => {
    return (
        <div className="logo">
            <Image width={120} src={logo} margin={'0 auto'} preview={false}/>
        </div>
    );
};
const CustomLayoutFC =({children})=>{
    return (
        <>
            <div id="layout-wrapper" style={{minHeight:'100vh'}}>
                <Navbar />
                {/*<Sidebar />*/}
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid" style={{maxWidth:'100%'}}>
                           {children}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}


export const CustomLayout = ({isLogged,children})=> {
    const username = useSelector((state) => state.getUserInfo.userInfo).username
    const logout_new = (e) => {
        authAxios(cookies.get('token')).get(logoutURL).then(res=>{
        window.location = '/login'
        })
        logout();
    }

    const menu = (
        <Menu>
            <Menu.Item key="3" icon={<PoweroffOutlined/>} onClick={e => logout_new(e)}>Đăng xuất
            </Menu.Item>
        </Menu>
    );

    const onUnAuth = () =>{
        console.log('un auth')
        // localStorage.setItem('loginRedirect',this.props.location.pathname)
        return 'Chưa đăng nhập'
    }

    return (
        isLogged ?
            (
                <CustomLayoutFC children={children}/>

            ) : onUnAuth()

    );
}

