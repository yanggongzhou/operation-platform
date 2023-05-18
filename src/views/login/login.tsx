import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useStore } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.scss";
import { ILoginForm, login } from "@/service/user";
import { setUserInfo } from "@/store/modules/user.module";
import { validateEmail } from "@/utils/validator";
import { AppState } from "@/store";
import { setLoading } from "@/store/modules/common.module";

const { useForm, Item } = Form;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

export const Login = () => {
  const store = useStore();
  const [form] = useForm(); // 表单实例
  const navigate = useNavigate(); // 路由跳转
  // 提交登录
  const loginBtn = async ({ userName, password }: ILoginForm) => {
    console.log('表单实例--------->', form);
    const data = await login({ userName, password });
    store.dispatch(setUserInfo(data));
    store.dispatch(setLoading(false));
    console.log('store----->', store, store.getState());
    navigate('/');
  };

  // useSelector 从 store 状态读取一个值并订阅更新
  // useDispatch 返回 store 的dispatch方法调度操作。
  const { loginLoading } = useSelector((state: AppState) => ({
    loginLoading: state.common.loading
  }));

  // useEffect 可以执行有副作用的方法
  // useMemo useCallback 只能执行无副作用的方法
  useEffect(() => {

    // ...
  }, []);

  return <div className={style.loginWarp}>
    <Link to={'/'}>home</Link>

    <Form
      className={style.loginForm}
      {...layout}
      form={form}
      name="basic"
      initialValues={{ userName: '', password: '' }}
      onFinish={loginBtn}
    >
      <Item label={'Email'} name="userName" required rules={[validateEmail()]}>
        <Input prefix={<UserOutlined/>} maxLength={50} placeholder="邮箱地址"/>
      </Item>

      <Item label={'Password'} name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password maxLength={20} prefix={<LockOutlined/>} placeholder="密码"/>
      </Item>

      <Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          loading={loginLoading}
          type="primary"
          block
          htmlType="submit"
          className={style.loginBtn}
        >
          登录
        </Button>
      </Item>
    </Form>
  </div>;
};



// useEffect(() => {
//   windowBack();
//   return () => {
//     if (isPaint.current) { // 初次渲染回执行销毁，故做拦截处理
//       isPaint.current = false;
//       return;
//     }
//     window.onpopstate = null;
//   };
// }, []);
//
// // 保存挽留
// const windowBack = () => {
//   window.onpopstate = function () {
//     if (isNeedSave.current) {
//       onSave(true);
//       window.history.pushState('forward', '', '');
//       window.history.forward();
//     } else {
//       // window.onpopstate = null; window.history.go(-2);
//       navigate('/adsReporting', { replace: true });
//     }
//   };
//   window.history.pushState('forward', '', '');
//   window.history.forward();
// };
