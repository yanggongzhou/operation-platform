import React, { FC } from "react";
import { Layout } from "antd";
const { Header, Sider, Content, Footer } = Layout;


const LayoutCom: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Layout style={{ height: '100%' }}>
    <Header>
      <h1 style={{ color: "white", textAlign: "center" }}>header</h1>
    </Header>
    <Layout>
      <Sider><h1 style={{ color: "white" }}>Menu</h1></Sider>
      <Content>
        {children}
      </Content>
    </Layout>
  </Layout>
};

export default LayoutCom;
