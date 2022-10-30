import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import {Layout, Menu } from 'antd';
import React from 'react';
const { Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `${key}`,
    icon: React.createElement(icon),
    label: `${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

function SiderNav() {

    return ( 
      <Sider width={100} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '50%', borderRight: 0 }}
          items={items2}
        />
      </Sider>

     );
}

export default SiderNav;