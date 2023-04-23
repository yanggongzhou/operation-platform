import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userInfoAsync } from "@/store/modules/user.module";
import { AppDispatch } from "@/store";

const Layout = () => {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userInfoAsync());
  }, []);
  return <div>
    Layout
  </div>;
};

export default Layout;
