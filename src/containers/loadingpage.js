import React from "react";

import {Button,Result, Space, Spin} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";



class BlankLayout extends React.Component {
    
    render() {
        return (
            <div id="layout-wrapper" style={{minHeight:'100vh'}}>
                {/*<Sidebar />*/}
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid" style={{maxWidth:'100%'}}>
                            <div style={{margin: "20px 0",
                                        marginBottom: "20px",
                                        padding: "30px 50px",
                                        textAlign: "center",
                                        background: "rgba(0, 0, 0, 0.05)",
                                        borderRadius: "4px"
                                    }}>
                                <Spin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        );
    }
}

export default withRouter(
    connect(
    )(BlankLayout)
);
