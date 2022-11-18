import React from "react";
import moment from "moment";
import 'moment/locale/vi';
import Navbar from "./navbar/Navbar";

moment.locale('vi');

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

