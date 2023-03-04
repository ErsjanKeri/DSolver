import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    FireOutlined,
    NodeIndexOutlined,
    NumberOutlined,
    InsertRowRightOutlined,
    PartitionOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu, theme } from 'antd';
  import React from 'react';

  import { Link } from 'react-router-dom';


  
  const { Header, Content, Footer, Sider } = Layout;


  const CustomLayout = (props) => {
    const {
      token: { colorBgContainer },
    } = theme.useToken();


    return (
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          
          <Menu theme="dark" 
                mode="inline" 
                defaultSelectedKeys={['4']} 
                > 
                <Menu.Item key={"homepage"} icon={<FireOutlined />}>
                    <Link to="/">
                        Homepage
                    </Link>
                    
                    
                </Menu.Item>
                <Menu.Item key={"homepage2"} icon={<NodeIndexOutlined />}>
                    <Link to="/havelhakimi">
                        Havel Hakimi
                    </Link>
                </Menu.Item>

                <Menu.Item key={"homepage3"} icon={<NumberOutlined />}>
                    <Link to="/">
                        Kombinatorik
                    </Link>
                </Menu.Item>

                <Menu.Item key={"homepage4"} icon={<InsertRowRightOutlined />}>
                    <Link to="/">
                        EEA 
                    </Link>
                </Menu.Item>

                <Menu.Item key={"homepage5"} icon={<PartitionOutlined />}>
                    <Link to="/">
                        DPPL
                    </Link>
                </Menu.Item>
            </Menu>


        </Sider>
      
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                background: colorBgContainer,
              }}
            >
                {props.children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            DSolver ©2023 Created with excellenz by not-so-excellent Tum students
          </Footer>
        </Layout>
      </Layout>
    );
  };
  export default CustomLayout;