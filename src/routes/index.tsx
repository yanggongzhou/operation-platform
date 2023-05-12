import React, { Suspense } from "react";
import { Route, Routes, Navigate, HashRouter } from "react-router-dom";
import { Spin } from "antd";
import Routers from "./router";
import LayoutCom from "@/components/layout";

const RouterView = () => {
  return (
    <HashRouter>
      {/* 导航跳转必须包裹在router中，不然组件无法使用useHistory和useLocation */}
      {/*<Navbar />*/}
      {/* fallback控制异步加载组件时等待的动画 */}
      <Suspense fallback={< div style={{ width: "100%", height: "100%", fontSize: "50px", display: "flex", justifyContent: "center", alignItems: "center", color: "rgba(49, 213, 248, 1)" }}>
        {/*<LoadingOutlined />*/}
        <Spin />
      </div>}>
        <Routes>
          <Route path={'/'} element={<Navigate to="/adsReporting" />}/>
          {Routers.map((item) => {
            const TempComponent = item.component;
            // 根据组件是否需要权限验证以及登录状态控制页面显示
            return <Route key={item.key} path={item.path} element={ <LayoutCom><TempComponent /></LayoutCom>} />;
          })})
          {/*react-router-dom  版本V6 中弃了Redirect，需要用Navigate实现重定向。*/}
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default RouterView;
