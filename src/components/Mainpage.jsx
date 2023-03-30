import { Col, Row, Card } from 'antd'
import React from 'react'

import { Link } from 'react-router-dom';

import { routes } from '../routes';

const { Meta } = Card;


function Mainpage() {


  return (
    <>
    <Row gutter={[24, 24]}>


        {routes.map((obj, i) => {
          return (
            <Col key={i} className="gutter-row" xl={8} lg={8} md={12} sm={24} xs={24}>
                <Link to={obj.link}>
                    <Card
                      hoverable
                      style={{
                        width: "100%",
                      }}
                      cover={<img alt={obj.homepage_title} src={require(`../images/${obj.img_src}`)} />}
                    >
                      <Meta style={{"textAlign" : "center"}} title={obj.homepage_title}/>
                    </Card>
                </Link>
            </Col>
          )
        })}

    
    </Row>
    
    </>
  )
}

export default Mainpage