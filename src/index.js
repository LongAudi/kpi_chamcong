import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import viVN from 'antd/lib/locale/vi_VN';
import {ConfigProvider} from "antd";

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={viVN}>
            <App />
      </ConfigProvider>
    </Provider>,
  document.getElementById('root')
);