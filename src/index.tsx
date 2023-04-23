import React from 'react';
import { createRoot } from 'react-dom/client';
import zhCN from 'antd/es/locale/zh_CN'; // 多语言 可配置react-i18next等
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { createHashHistory } from 'history';
import { store } from "@/store";
import { initAxios } from "@/utils/axios";
import RouterView from "@/routes";
import 'antd/dist/reset.css';
import './index.css';

const history = createHashHistory();
// axios初始化
initAxios(store, history);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <RouterView/>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
