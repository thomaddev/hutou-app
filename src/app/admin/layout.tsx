"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useState } from "react";
import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const inter = Inter({ subsets: ["latin"] });

type MenuItem = Required<MenuProps>["items"][number];
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem("User", "1", <PieChartOutlined />),
  getItem("Room", "2", <DesktopOutlined />),
//   getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
//   getItem("Team", "sub2", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8")]),
//   getItem("Files", "9", <FileOutlined />),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <div className="demo-logo-vertical" />
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
            </Sider>

            <Layout>
              <Header style={{ padding: 0, background: colorBgContainer }} />
              <Content style={{ margin: "0 16px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                {children}
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  Bill is a cat.
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
            </Layout>
          </Layout>
         
        </AntdRegistry>
      </body>
    </html>
  );
}
