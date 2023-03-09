import { Col, Row } from 'antd'
import React from 'react'

function Mainpage() {
  const arrs = [1,2,3,4,5,6]
  return (
    <Row gutter={[24,24]}>
        {arrs.map(i => {
            return (
            <Col className='gutter-row' xs={8} style={{"height" : "200px"}}>
                {i} 
            </Col>
            )
        })}
    </Row>
  )
}

export default Mainpage