import { Col, Row, Card } from 'antd'
import React from 'react'

import { Link } from 'react-router-dom';

const { Meta } = Card;

function Mainpage() {

  return (
    <>
    <Row gutter={[24, 24]}>

        <Col className="gutter-row" span={8}>
            <Link to="/eea">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="example" src={require('../images/eea.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Erweiterter euklidischer Algorithmus"/>
                </Card>
            </Link>
        </Col>
        <Col className="gutter-row" span={8}>
            <Link to="/dpll">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="example" src={require('../images/dpll.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="DPLL"/>
                </Card>
              </Link>
        </Col>

        <Col className="gutter-row" span={8}>
            <Link to="/relation">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="example" src={require('../images/relation.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Relationales Produkt"/>
                </Card>
            </Link>
        </Col>

        <Col className="gutter-row" span={8}>
            <Link to="/havelhakimi">

                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="example" src={require('../images/hakimi.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Havel-Hakimi"/>
                </Card>
            </Link>
        </Col>

        <Col className="gutter-row" span={8}>
            <Link to="/truthtable">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="example" src={require('../images/truthtable.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Wahrheitstabelle"/>
                </Card>
            </Link>
        </Col>

        <Col className="gutter-row" span={8}>
            <Link to="/kombinatorik">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="example" src={require('../images/kombinatorik.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Kombinatorik"/>
                </Card>
            </Link>
        </Col>

        <Col className="gutter-row" span={8}>
            <Link to="/groups">
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={<img alt="example" src={require('../images/groups.png')} />}
                >
                  <Meta style={{"textAlign" : "center"}} title="Algebra Gruppen"/>
                </Card>
            </Link>
        </Col>
      
    </Row>
    
    </>
  )
}

export default Mainpage