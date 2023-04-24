import { lazy, ComponentType } from "react";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

function AsyncComponent(
  loader: () => Promise<{ default: ComponentType<any> }>
) {
  NProgress.start();
  return lazy(() => loader().finally(() => NProgress.done()));
}
// const Home = AsyncComponent(() => import("@/views/home"));
// const Login = AsyncComponent(() => import("@/views/login"));
const AdReport = AsyncComponent(() => import("@/views/ad-report"));

const Routers = [
  { path: "/", key: 0, component: AdReport }, // 广告管理
  // { path: "/", key: 1, component: Home }, // 首页
  // { path: "/home", key: 2, component: Home }, // 首页
  // { path: "/Login", key: 3, component: Login }, // 登陆
];

export default Routers;
