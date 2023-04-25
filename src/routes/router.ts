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
const AdReporting = AsyncComponent(() => import("@/views/ad-reporting"));
const AdsReporting = AsyncComponent(() => import("@/views/ads-reporting"));

const Routers = [
  { path: "/adsReporting", key: 1, component: AdsReporting }, // 广告报告
  { path: "/adReporting", key: 0, component: AdReporting }, // 广告报告详情
];

export default Routers;
