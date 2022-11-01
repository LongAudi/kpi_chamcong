import axios from "axios";
import {
    endpoint,
    token_refresh_URL,
} from "../constants";
import Cookies from 'universal-cookie';

import {openNotificationWithIcon} from "../containers/Function";

const cookies = new Cookies()

const authAxiosTest = () => {
    const token = cookies.get('token')
    const axiosTest = axios.create({
          baseURL: endpoint,
          headers: {
            Authorization: `Bearer ${token}`,
          }
    });
    axiosTest.interceptors.response.use(response => {
        return response;
    }, error => {
        return new Promise((resolve, reject) => {
            const oroginReq = error.config;
            try {
                if(error.response.status === 400) {
                    reject(error.response)
                    // const dataError = Object.entries(error.response.data).map(([key,value]) => (<p>value</p>))
                    // openNotificationWithIcon('error','Lỗi',dataError)
                    // message.error("Không tìm thấy dữ liệu");
                }
                if(error.response.status === 404 || error.response.status === 500) {
                    reject(error.response)
                    // openNotificationWithIcon('error','Lỗi','Không tìm thấy dữ liệu')
                    // message.error("Không tìm thấy dữ liệu");
                }
                if(error.response.status === 403) {
                    openNotificationWithIcon('error','Lỗi','Bạn không có quyền xem chức năng này')
                    reject(error.response)
                    // message.error("Không tìm thấy dữ liệu");
                }
                else if ( error.response.status === 401 && error.config) {
                    oroginReq._retry = true;
                    let refresh = cookies.get('refresh');
                    if (refresh) {
                        let res = fetch(token_refresh_URL, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                refresh: cookies.get('refresh')
                            })
                        }).then(res => res.json()).then(res => {
                            oroginReq.headers.Authorization = `Bearer ${res.access}`;
                            // cookies.set("token",res.access);
                            return axios(oroginReq);
                        });
                        resolve(res);
                    } else {
                        console.log("not login")
                        window.location = "/login"
                        // window.location = localhost +  '/api/test_call_server/?redirect_uri=http://test1.vbpo.vn/auth&client=client_03';

                    }
                }
            } catch (e) {
                localStorage.setItem('error_s','1')
                // logout();
                window.location = '/login';
                    // message.success('Lỗi kết nối, kiểm tra kết nối tới server1 !!!', 10);
            }
            return Promise.reject(error);
        });
    });

    return axiosTest;
};



export const authAxios = () => authAxiosTest();
