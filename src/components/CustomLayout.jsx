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
    GithubOutlined
  } from '@ant-design/icons';
  import { Layout, Menu, theme, Popover, Row, Col ,Space} from 'antd';
  import React, {  useState } from 'react';
  import { Helmet } from "react-helmet";

  import { Link } from 'react-router-dom';

  import icon from "../images/favicon.ico"
  import appleIcon from "../images/appleicon.png"
  import cutout from "../images/cutout.png"
  import smallCutout from "../images/smallCutout.png"
  
  
  const { Header, Content, Footer, Sider } = Layout;


  const CustomLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const {
      token: { colorBgContainer },
    } = theme.useToken();


    return (
      <Layout hasSider>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Solver</title>
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
                defaultSelectedKeys={['4']} 
                > 
                <Menu.Item key={"homepage"} icon={<FireOutlined />}>
                    <Link to="/">
                        Übersicht
                    </Link>
                    
                </Menu.Item>
                <Menu.Item key={"havel-hakimi"} icon={<NodeIndexOutlined />}>
                    <Link to="/havelhakimi">
                        Havel-Hakimi
                    </Link>
                </Menu.Item>

                <Menu.Item key={"kombinatorik"} icon={<NumberOutlined />}>
                    <Link to="/kombinatorik">
                        Kombinatorik
                    </Link>
                </Menu.Item>

                <Menu.Item key={"dpll"} icon={<PartitionOutlined />}>
                    <Link to="/dpll">
                        DPLL
                    </Link>
                </Menu.Item>

                <Menu.Item key={"eea"} icon={<InsertRowRightOutlined />}>
                    <Link to="/eea">
                        EEA 
                    </Link>
                </Menu.Item>

                <Menu.Item key={"relation"} icon={<GatewayOutlined />}>
                    <Link to="/relation">
                        Relationales Produkt
                    </Link>
                </Menu.Item>

                <Menu.Item key={"groups"} icon={<RedoOutlined />}>
                    <Link to="/groups">
                        Algebra Gruppen
                    </Link>
                </Menu.Item>
                

                <Menu.Item key={"truthtable"} icon={<TableOutlined />}>
                    <Link to="/truthtable">
                        Warheitstabelle
                    </Link>
                </Menu.Item>

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
              background: colorBgContainer,
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
                {props.children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            DSolver ©2023 Created with excellenz by not-so-excellent <a href="https://www.tum.de/">TUM</a>  students. {' '}
                                    <a>
                                      <Popover  placement="top" title={"Disclaimer"} content={<>
                                        <Row className='disclaimer'>
                                            <Col xs={24}>
                                              Hinweis: Wir haben alles nach bestem Wissen und Gewissen erstellt, können aber Fehler natürlich nicht ausschließen. Deshalb können wir keine Gewähr für irgendwelche Ergebnisse geben.  
                                              Lasst uns gerne über die Feedback Form wissen, falls ihr einen Fehler/Bug findet. 
                                              Es gelten immer die Informationen aus den Vorlesungsunterlagen bzw. von der Übungsleitung.
                                              <br/>
                                              Der Zweck dieser Seite ist es, sich Musterlösungen zu erstellen, um das Lernen zu erleichtern. Es ersetzt nicht sich mit dem Stoff auseinanderzusetzen, z.B. den EEA selbst durchzuführen. 
                                              Es geht bei DS  nicht darum sich Algorithmen zu merken, z.B. den EEA perfekt auszuführen, da es ziemlich trivial ist ihn zu automatisieren (wir haben es ja auch hinbekommen), sondern darum, zu verstehen wie diese Algorithmen grundsätzlich funktionieren und WARUM sie funktionieren. )
                                            
                                            </Col>
                                        </Row>
                                      </>} trigger="click">
                                          DISCLAIMER
                                      </Popover>  
                                    </a>
          </Footer>
        </Layout>
      </Layout>
    );
  };
  export default CustomLayout;