import React, { useState, useEffect, FC } from "react";
import "./list.scss";
import { useDispatch } from "react-redux";
import { fetchAPIProviders } from "../../slice/apiProvidersSlice";
import { BlogPost, User } from "../../types/client/clientTypes";
import { fetchAPIDetails } from "../../slice/apiDetailsSlice";
import { useNavigate } from "react-router";

import {
  NotificationOutlined,
  UserOutlined,
  BarChartOutlined,
  CalendarOutlined,
  SendOutlined,
  BellOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";

const { Content, Sider } = Layout;

const items2: MenuProps["items"] = ["Dashboard", "Blogs"].map((item, index) => {
  const key = String(index + 1);
  const submenu =
    index > 0
      ? [
          { label: "All", icon: MessageOutlined },
          { label: "Latest", icon: InfoCircleOutlined },
          { label: "Archived", icon: CalendarOutlined },
        ]
      : [
          { label: "Overview", icon: BarChartOutlined },
          { label: "Calendar", icon: CalendarOutlined },
          { label: "Schedule Actions", icon: SendOutlined },
          { label: "Live Alerts", icon: BellOutlined },
        ];

  return {
    key: `sub${key}`,
    label: item,
    children: submenu.map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        icon: React.createElement(_.icon),
        label: _.label,
      };
    }),
  };
});

export const List: FC<any> = () => {
  const dispatch = useDispatch<any>();
  const [apiProviders, setAPIProviders] = useState<User>();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    const apiProvidersResponse = dispatch(fetchAPIProviders(randomId));
    const userBlogPosts = dispatch(fetchAPIDetails(randomId));

    apiProvidersResponse.then((res: any) => {
      setAPIProviders(res.payload);
    });
    userBlogPosts.then((response: any) => {
      setBlogPosts(response.payload);
    });
  }, [dispatch]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout
        style={{
          padding: "24px 0",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Sider style={{ background: colorBgContainer }} width={250}>
          <div
            style={{
              marginInlineStart: 80,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src="https://avatar.iran.liara.run/public/35"
              alt="profile"
              height={80}
              width={80}
            />
          </div>
          <div style={{ marginInlineStart: 60 }}>
            <div style={{ marginInlineStart: 20, marginBlock: 10 }}>
              <span>Hello</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <strong>
                <UserOutlined className="spacer" />
                {apiProviders?.name}
              </strong>
              <span>
                <MailOutlined className="spacer" />
                {apiProviders?.email}
              </span>
              <span>
                <PhoneOutlined className="spacer" />
                {apiProviders?.phone}
              </span>
            </div>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
            items={items2}
          />
        </Sider>
        <Content style={{ padding: "0 24px", minHeight: "100vh" }}>
          <NotificationOutlined className="spacer" />
          All Blog Posts
          {blogPosts.length > 0 &&
            blogPosts.map((blog) => (
              <div key={blog.id} className="blog">
                <div>{blog.title}</div>
                <div>{blog.body}</div>
              </div>
            ))}
        </Content>
      </Layout>
    </Layout>
  );
};
