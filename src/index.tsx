import React from 'react';
import { createRoot } from 'react-dom/client';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { createHashHistory } from 'history';
import dayjs from 'dayjs';
import { store } from "@/store";
import { initAxios } from "@/utils/axios";
import RouterView from "@/routes";
import 'antd/dist/reset.css';
import './index.css';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const history = createHashHistory();
// axios初始化
initAxios(store, history);

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN} theme={{
        "token": {
          "colorPrimary": "#1ab394",
          "fontSize": 12,
          "borderRadius": 3,
          "wireframe": true
        }
      }}>
        <RouterView/>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
