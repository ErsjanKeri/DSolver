import React, { useState } from 'react'

import { Col, Row, Typography, Input, Button, Select, Space } from "antd" 


function Groups() {
    const [menge, setMenge] = useState("")
    const [operation, setOperation] = useState("")
    const [n, setN] = useState(null)


    const [erzeugers, setErzeugers] = useState(0)
    const [elements, setElements] = useState(new Map())


    return (
    <>
        <Row>
            <Col xs={24}>
                <Space wrap>
                    <Select
                        onChange={(e) => { setMenge(e) }}
                        options={[
                            { value: 'Z', label: 'Z' },
                            { value: 'Zn', label: 'Zn' },
                            { value: 'Zn*', label: 'Zn*' },
                        ]}

                        placeholder={"Menge"}
                    />
                    {(menge !== "Z" && menge !== "") && (<Input style={{"width" : 120}} onChange={(e) => { setN(e.target.value) }} placeholder='N'/>)}
                    <Select
                        onChange={(e) => { setOperation(e) }}
                        options={[
                            { value: '+', label: '+' },
                            { value: '*', label: '*' },
                        ]}
                        placeholder={"Operation"}
                    />

                    <Button>Calculate</Button>

                </Space>
            
            </Col>

        </Row>
    </>
    )


    function calculate() {
            
    }
}

export default Groups