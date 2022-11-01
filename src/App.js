import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Alert, Progress,Image } from "antd";
import React from "react";
import img from '../src/Assest/Logo.jpg';
const { Header, Content, Footer, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const App = () => (
  <Layout>
    <Content
      style={{
        padding: "0 50px",
      }}
    >
       
      <Layout
        className="site-layout-background"
        style={{
          padding: "24px 0",
        }}
      >
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["Section"]}
            style={{
              height: "100%",
            }}
            items={items2}
          />
           <Image src={img} style={{width:'200px'}}></Image>
        </Sider>
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          <Alert
            message="Virtusa Document Managment System"
            description="Detailed description and advice about successful copywriting."
            type="success"
            showIcon
          />

          <Progress style={{ margin: "10%" }} type="circle" percent={75} />

          <Progress style={{ margin: "10%" }} type="circle" percent={100} />

          <Progress
            style={{ margin: "10%" }}
            type="circle"
            percent={70}
            status="exception"
          />
        </Content>
      </Layout>
    </Content>
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);
export default App;
