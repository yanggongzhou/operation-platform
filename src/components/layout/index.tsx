import React from "react";
import { useEffect } from "react";
import { userInfoAsync } from "@/store/modules/user.module";
import { useAppDispatch } from "@/store";

const Layout = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userInfoAsync());
  }, []);
  return <div>
    Layout
  </div>;
};

export default Layout;
