import axios from "axios";
import {
    endpoint,
    token_refresh_URL,
} from "./constants";
import Cookies from 'universal-cookie';

const cookies = new Cookies()

// var MockAdapter = require("axios-mock-adapter");
// var mock = new MockAdapter(axios);

// mock.onPost(loginURL).reply(200, {
//   access:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4OTk4MjY4LCJqdGkiOiI5ZTAwNzhjZWQ3NjE0Zjg5ODZjZWViMGY4MWZhZjI2OSIsInVzZXJfdXNlcm5hbWUiOiJhZG1pbiJ9.OH63rrHyt7NdF_VpQP63zaXRErGl2CHvSrnpdH1j6xs",
//     refresh:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyODY1MjY2OCwianRpIjoiMDc3Nzg1YmZjZjQzNGYzZWJhZmM2MTc4ODU0ZGY1MmIiLCJ1c2VyX3VzZXJuYW1lIjoiYWRtaW4ifQ.zFr1FyBE3FoyPwWLcNTdix3fihOIu-jUhgi_EjD-gUM"
// });

// mock.onGet(userIDURL).reply(200,userinfo)

// const ticketDetailURLUri = "https://ticket.dri-a.site/api/ticket_manager";
// const ticketDetailURLUriMock = new RegExp(`${ticketDetailURLUri}/*`);
// mock.onGet(ticketDetailURLUriMock).reply(200,ticket_detail);

// const ticketLichsuthaydoiURLUri = "https://ticket.dri-a.site/api/lichsuthaydoi";
// const ticketLichsuthaydoiURLUriMock = new RegExp(`${ticketLichsuthaydoiURLUri}/*`);
// mock.onGet(ticketLichsuthaydoiURLUriMock).reply(200,[]);

// mock.onGet(ticketsListURL).reply(200,
//   ticket_list
// );
// mock.onGet(ListStatusURL).reply(200,
//   list_status
// );
// mock.onPost(ListAction).reply(200,
//   mock_list_action
// );

// mock.onGet(ListNotification).reply(200,
//   []
// );

// mock.restore();
const authAxiosTest = (token) => {
    const axiosTest = axios.create({
          baseURL: endpoint,
          headers: {
            Authorization: `Bearer ${token}`
          }
    });
    // debugger
    axiosTest.interceptors.response.use(response => {
        return response;
    }, error => {
        return new Promise((resolve, reject) => {
            const oroginReq = error.config;
            try {
                if(error.response.status === 400) {
                    // const dataError = Object.entries(error.response.data).map(([key,value]) => (<p>value</p>))
                    // openNotificationWithIcon('error','Lỗi',dataError)
                    reject(error.response);
                    // message.error("Không tìm thấy dữ liệu");
                }
                if(error.response.status === 404 || error.response.status === 500) {
                    window.location.href = '/notfound'
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
                        window.location = "/login"
                        // window.location = localhost +  '/api/test_call_server/?redirect_uri=http://test1.vbpo.vn/auth&client=client_03';

                    }
                }
            } catch (e) {
                console.log(e)
                localStorage.setItem('error_s','1')
                // logout();
                // window.location = '/login';
                    // message.success('Lỗi kết nối, kiểm tra kết nối tới server1 !!!', 10);
            }
            return Promise.reject(error);

        });
    });

    return axiosTest;
};



export const authAxios = (token) => authAxiosTest(token);
