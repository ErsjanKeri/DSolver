import React from "react";
import {Row, Col, Space, Avatar, Typography} from "antd"
import { GithubOutlined,
    LinkOutlined,
    HomeOutlined,
    LinkedinOutlined,
    InstagramOutlined,
    YoutubeOutlined,
    UserOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography

function Credits() {

    const contributer = [
        {
            name: "Lukas Ketzer",
            links: {
                github: "https://github.com/lukasketzer"
            }
        },
        {
            name: "Ersjan Këri",
            links: {
                github: "https://github.com/ErsjanKeri",
                linkedin: "https://al.linkedin.com/in/ersjan-k%C3%ABri-7a7240208",
                homepage: "https://www.fiverr.com/ersjankeri"
            }
        },
        {
            name: "Julia Kirzinger",
            links: {
                github: "https://github.com/Juli436", 
            }
        },
    {
            name: "Adil Köken",
            links: {
                github: "https://github.com/AdilKoken",
                linkedin: "https://de.linkedin.com/in/adil-k%C3%B6ken-711a1a205",
            }
        },
        {
            name: "David Holzwarth",
            links: {
                github: "https://github.com/davidholzwarth",
                linkedin: "https://de.linkedin.com/in/david-holzwarth-160613211",
            }
        }, 
    ]

    function Profile({name, links}) {
        const avatarSize = 64        

        let avatar = <Avatar size={avatarSize} icon={<UserOutlined/>} /> 
        if ("github" in links) {
            avatar = <Avatar size={avatarSize} src={links["github"] + ".png"} />
        }

        

        let linksHtml = Object.keys(links).map((key, index) => {
            let icon
            let iconColor
            switch (key){
                case "github":
                    icon = <GithubOutlined/>
                    iconColor = "#21272d"
                    break;
                case "linkedin":
                    icon = <LinkedinOutlined/>
                    iconColor = "#0a66c2"
                    break;
                case "homepage":
                    icon = <HomeOutlined/>
                    iconColor = "#13B900"
                    break;
                case "instagram":
                    icon = <InstagramOutlined />
                    iconColor = "#D62290"
                    break;
                case "youtube":
                    icon = <YoutubeOutlined />
                    iconColor = "#ff0000"
                    break;
                default:
                    icon =  <LinkOutlined/>
                    iconColor = "#21262d"
                    break;
            }
            
            return (
                <Row>
                    <a href={links[key]}
                    style={{
                        color: iconColor,
                        fontSize: "1.2rem"
                    }}>{icon}</a>
                </Row>
            )

        })

        
        return (
            <Row>
                <Space size="middle">
                    <Col>
                        {avatar}
                    </Col>
                    <Col>
                        <Space direction="vertical">
                                <Title style={{"marginBottom" : "0", "paddingBottom" : "0", "whiteSpace" : "noWrap"}} level={5}>
                                    {name}
                                </Title>
                                <Space>
                                    {linksHtml}
                                </Space>
                        </Space>
                    
                    </Col>

                </Space>
            </Row>
        )
    }
    
    
   
    return (
        <>
            <Row justify={"center"} className="mb-3">
                <Col lg={18}>
                    <Title style={{textAlign:"center"}} level={3}>Das Team</Title>


                    <Row gutter={[32,32]} className="mt-4">
                        {contributer.map((item, i) => {
                            return (
                                <Col className="gutter-row" key={i} xl={8} lg={8} md={12} sm={24} xs={24}>
                                    <Profile 
                                        name={item.name} 
                                        links={item.links} />
                                </Col>
                            )
                        })}
                    </Row>


                </Col>
            </Row>
        </>

    )
}

export default Credits
