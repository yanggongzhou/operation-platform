// router.ts
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
const Home = AsyncComponent(() => import("@/views/home"));
const Login = AsyncComponent(() => import("@/views/login"));

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  { path: "/", key: 1, name: "首页", component: Home },
  { path: "/home", key: 2, name: "首页", component: Home },
  { path: "/Login", key: 2, name: "首页", component: Login },
];
