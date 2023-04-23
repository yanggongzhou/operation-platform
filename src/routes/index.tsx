import React, { Suspense } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import Routers from "./router";


const RouterView = () => {
  return (<div style={{ width: "100%", height: "100%" }}>
    <HashRouter>
      {/* 导航跳转必须包裹在router中，不然组件无法使用useHistory和useLocation */}
      {/*<Navbar />*/}
      {/* fallback控制异步加载组件时等待的动画 */}
      <Suspense fallback={< div style={{ width: "100%", height: "100%", fontSize: "50px", display: "flex", justifyContent: "center", alignItems: "center", color: "rgba(49, 213, 248, 1)" }}>
        <LoadingOutlined />
      </div>}>
        {/*<Navigate to={{ pathname: '/home'}} />*/}
        <Routes>
          {Routers.map((item) => {
            const TempComponent = item.component;
            // 根据组件是否需要权限验证以及登录状态控制页面显示
            return <Route key={item.name} path={item.path} element={<TempComponent />} />;
          })}
        </Routes>
      </Suspense>
    </HashRouter>
  </div>);
};

export default RouterView;
