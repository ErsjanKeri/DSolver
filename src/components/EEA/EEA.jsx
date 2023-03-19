import React, { useState } from 'react'
import {Button, InputNumber, Table, Row, Col, Typography, Space } from "antd"
import "./index.less"


const { Title, Text } = Typography


function EEA() {
  // initate table contents
  const collums = [
    {
      title: "a",
      dataIndex: "a",
      key: "a"
    },
    {
      title: "b",
      dataIndex: "b",
      key: "b"
    },
    {
      title: "⌊b/a⌋",
      dataIndex: "intDivision",
      key: "intDivision"
    },
    {
      title: "α",
      dataIndex: "alpha",
      key: "alpha"
    },
    {
      title: "β",
      dataIndex: "beta",
      key: "beta"
    }
  ] 



  // initate hooks
  const [aInput, setAInput] = useState("")
  const [bInput , setBInput] = useState("")
  const [ggt, setGgt] = useState(1)
  const [dataSource, setDataSource] = useState([])

  const [solved, setSolved] = useState(false)
  const [states, setStates] = useState([])
  const [counter, setCounter] = useState(0)

  // Function thats calles on solve button press
  // checks if there are valid numbers
  // i think this check in useless since it's now working witht number-input-fields
  function solve(){
    if(aInput !== "" || bInput !== ""){
      filleEaaTable();
    }
  }


  /*
    function that creates every state of the table
  */
  function filleEaaTable() {
    let a = aInput
    let b = bInput
    let states = [[{
      a: a,
      b: b,
      intDivision: Math.floor(b/a),
      alpha: "",
      beta: ""
    }]];

    
    // fill left half of the table until end condition is met
    while(b%a !== 0){
      let new_a = b%a
      let new_b = a

      a = new_a;
      b = new_b;
      
      // get last state and update it with the new row
      // let newState = states[states.length - 1].slice(0)
      let newState = structuredClone(states[states.length - 1])

      newState.push({
        a: a,
        b: b,
        intDivision: b%a === 0 ? "-" : Math.floor(b/a),
        alpha: "",
        beta: ""
      })
      states.push(newState)

    }

    // solve right part

    // creat new state with last row filled in 
    let newState =  structuredClone(states[states.length - 1])
    
    newState[newState.length - 1].alpha = 1
    newState[newState.length - 1].beta = 0
    states.push(newState)    
    
    let depth = newState.length
    // walk up rows
    for(let i = depth - 1; i >= 1; i--){
      // get most recent state
      newState = structuredClone(states[states.length - 1])
      // calculate 
      let alpha = newState[i].alpha
      let beta = newState[i].beta
      let intDiv = newState[i-1].intDivision

      newState[i - 1].alpha = beta - (intDiv * alpha)
      newState[i - 1].beta = alpha

      states.push(newState)
    }
    // update dataSource
    let alpha = states[states.length - 1][0].alpha
    let beta = states[states.length - 1][0].beta
    setGgt(alpha * aInput + beta * bInput)
    setStates(states)
    setDataSource(states[counter])
    setSolved(true)
  }


  return (
      <>

        <Row justify={"center"} className="mb-3">

            <Col xs={24} >
                <Title style={{"textAlign":"center"}} level={4}>Erweiterter euklidischer Algorithmus</Title>
                <Row justify={"center"}>
                  <Col md={8} sm={16} xs={24}>
                      <Row gutter={[8, 8]}>
                          <Col xs={24}>
                              <Row gutter={[8,0]}>
                                  <Col xs={12}>
                                      <InputNumber style={{"width" : "100%"}} value={aInput} onChange={(value) => {setAInput(value)}} placeholder='a'/>
                                  </Col>
                                  <Col xs={12}>
                                      <InputNumber style={{"width" : "100%"}} value={bInput} onChange={(value) => {setBInput(value)}} placeholder='b'/>
                                  </Col>
                              </Row>
                          </Col>
                          <Col xs={24}>
                                <Button style={{"width" : "100%"}} type="primary" onClick={solve} disabled={(aInput === "" || bInput === "")}>Berechnen</Button>
                          </Col>
                      </Row>
                      
                  </Col>
                </Row>
            
            </Col>
        </Row>
       
        
        {solved && (
          <Row gutter={[0, 8]} justify={"center"} className="mb-4">
            <Col md={14} sm={24}>
                  <Row >
                        <Col xs={24}>
                            <Space wrap>
                                <Button id="reveal"  onClick={() => {
                                    setDataSource(states[states.length - 1])
                                    setCounter(states.length - 1)
                                  }}>Lösen</Button>  

                                
                                  <Button id="back" onClick={() => {
                                            if(counter > 0){
                                              setDataSource(states[counter - 1])
                                              setCounter(counter - 1)
                                            }
                                          }}>Zurück</Button>
                                <Button id="next" type="primary" onClick={() => {
                                            if(counter < states.length - 1){
                                              setDataSource(states[counter + 1])
                                              setCounter(counter + 1)
                                            }
                                          }}>Weiter</Button>

                                {/* <Col>
                                  ggt = α * a + β * b = {ggt}
                                </Col> */}
                                
                          </Space>
                      </Col>
                  </Row>
              </Col>
            <Col lg={14} sm={24}>
            
                <Table id='eea_table' 
                  dataSource={dataSource} 
                  columns={collums} 
                  pagination={false} 
                  tableLayout={"fixed"} 
                  size={"small"}/>

                  <h3 id="ggt">
                    ggt = α * a + β * b = {ggt}
                  </h3>
              </Col> 
          </Row>
          
        )}
       
    </>
  )
}


export default EEA