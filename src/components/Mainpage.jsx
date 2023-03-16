import { Col, Row, Card } from 'antd'
import React from 'react'

import { Link } from 'react-router-dom';

const { Meta } = Card;

function Mainpage() {

  return (
    <>
    <Row gutter={[24, 24]}>

        <Col className="gutter-row" xl={8} lg={8} md={12} sm={24} xs={24}>
            <Link to="/eea">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="EEA" src={require('../images/eea.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Erweiterter euklidischer Algorithmus"/>
                </Card>
            </Link>
        </Col>
        <Col className="gutter-row" xl={8} lg={8} md={12} sm={24} xs={24}>
            <Link to="/dpll">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="DPLL" src={require('../images/dpll.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="DPLL"/>
                </Card>
              </Link>
        </Col>

        <Col className="gutter-row" xl={8} lg={8} md={12} sm={24} xs={24}>
            <Link to="/relation">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="Relationen" src={require('../images/relation.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Relationales Produkt"/>
                </Card>
            </Link>
        </Col>

        <Col className="gutter-row" xl={8} lg={8} md={12} sm={24} xs={24}>
            <Link to="/matching">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="Matching" src={require('../images/matching.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Stabiles Matching"/>
                </Card>
            </Link>
        </Col>

        <Col className="gutter-row" xl={8} lg={8} md={12} sm={24} xs={24}>
            <Link to="/havelhakimi">

                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="Havel-Hakimi" src={require('../images/hakimi.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Havel-Hakimi"/>
                </Card>
            </Link>
        </Col>

        <Col className="gutter-row" xl={8} lg={8} md={12} sm={24} xs={24}>
            <Link to="/truthtable">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="Wahrheitstabelle" src={require('../images/truthtable.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Wahrheitstabelle"/>
                </Card>
            </Link>
        </Col>


        <Col className="gutter-row" xl={8} lg={8} md={12} sm={24} xs={24}>
            <Link to="/groups">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="Algebra Gruppen" src={require('../images/groups.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Algebra Gruppen"/>
                </Card>
            </Link>
        </Col>
        
        <Col className="gutter-row" xl={8} lg={8} md={12} sm={24} xs={24}>
            <Link to="/kombinatorik">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="Kombinatorik" src={require('../images/kombinatorik.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Kombinatorik"/>
                </Card>
            </Link>
        </Col>

       
      
    </Row>
    
    </>
  )
}

export default Mainpage