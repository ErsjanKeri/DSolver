import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    RedoOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    FireOutlined,
    ForkOutlined,
    NodeIndexOutlined,
    NumberOutlined,
    InsertRowRightOutlined,
    GatewayOutlined ,
    PartitionOutlined,
    VideoCameraOutlined,
    TableOutlined,
    GithubOutlined,
    ApartmentOutlined,
    SwapOutlined
  } from '@ant-design/icons';
  import { Layout, Menu, theme, Popover, Row, Col ,Space, Dropdown} from 'antd';
  import React, {  useState } from 'react';
  import { Helmet } from "react-helmet";

  import { Link } from 'react-router-dom';

  import LanguagePicker from './LanguagePicker/LanguagePicker';

  import icon from "../images/favicon.ico"
  import appleIcon from "../images/appleicon.png"
  import cutout from "../images/cutout.png"
  
  import smallCutout from "../images/smallCutout.png"
  
  import { routes } from '../routes';
  import { useTranslation } from 'react-i18next';
  import i18next from 'i18next';
  
  const { Header, Content, Footer, Sider } = Layout;


  const CustomLayout = (props) => {
    // i18n
    const { t } = useTranslation()



    const [collapsed, setCollapsed] = useState(false);

    const {
      token: { colorBgContainer },
    } = theme.useToken();


    return (
      <Layout hasSider>
        <Helmet>
            <meta charSet="utf-8" />
            <title>DSolver</title>
            <meta name="description" content={"Application for solving DS exercises"}></meta>
            <link rel="icon" id="favicon" href={icon} />
            <link rel="apple-touch-icon" href={appleIcon} />
        </Helmet>

        <Sider 
          collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}

        
        >
          <div
            style={{
              height: 32,
              margin: 16,
              textAlign: "center",
            }}
          >
            {collapsed ? (
              <img src={smallCutout} alt="" style={{"height" : "40px","maxWidth" : "100%"}} />
            ) : (
              <img src={cutout} alt="" style={{"height" : "40px","maxWidth" : "100%"}} />
            )}
            
          </div>
          
          <Menu theme="dark" 
                mode="inline" 
                
                > 
                <Menu.Item key={"homepage"} icon={<FireOutlined />}>
                    <Link to="/">
                        {t("overview")}
                    </Link>
                    
                </Menu.Item>
               
                {routes.map((item, i) => {
                  return (
                    <Menu.Item key={i} icon={item.sidebar_icon}>
                        <Link to={item.link}>
                            {item.sidebar_title}
                        </Link>
                        
                    </Menu.Item>
                  )
                })}
                <Menu.Item key={"feedback"} icon={<GithubOutlined />}>
                    <Link to="https://github.com/ErsjanKeri/DSolver/issues">
                        Feedback
                    </Link>
                </Menu.Item>

            </Menu>


        </Sider>
      
        <Layout
          className="site-layout"
          style={{
            minHeight: "100vh"
          }}
        >
          <Header
            style={{
              padding: 0,
              margin: 0,
              paddingRight: "1rem",
              backgroundColor: "transparent"
            }}
          /> 
          <Content
            style={{
              //margin: '100px 24px 24px 24px',
              height: "100%",
              overflow: 'initial',
            }}
          >
            <div
              className='layout-div'
              style={{
                padding: 24,
                background: colorBgContainer,
              }}
            >
                {props.items}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          > 
            <Row wrap={true} justify="center" xl={20}>
              <Col></Col>
              <Col flex={"auto"}>
                DSolver ©2023 Created with excellenz by not-so-excellent <a href="/#/credits">TUM students</a>.  {' '}
                <br />
                <a>
                  <Popover  placement="top" title={t("disclaimer")} content={<>
                    <Row className='disclaimer'>
                        <Col xs={24}>
                          {t("disclaimer-body")}
                        </Col>
                    </Row>
                  </>} trigger="click">
                      {t("disclaimer").toLocaleUpperCase()}
                  </Popover>  
                </a> 
              </Col>
              <Col>
                <LanguagePicker/>
              </Col>
  
            </Row>
          </Footer>
        </Layout>
      </Layout>
    );
  };
  export default CustomLayout;