import React, { useState } from 'react'

import { Col, Row, Typography, Input, Button, Select, Space } from "antd" 
import Title from 'antd/es/typography/Title'


function Groups() {
    const [menge, setMenge] = useState("")
    const [operation, setOperation] = useState("")

    const [n, setN] = useState(0)
    const [neutral, setNeutralElement] = useState(0)

    // was nach calculation gezeigt wird
    const [showN, setShowN] = useState(null)  
    const [showMenge, setShowMenge] = useState(null)  
    const [showOperation, setShowOperation] = useState("")  
    const [showNeutral, setShowNeutralElement] = useState(0)
    const [showElements, setShowElements] = useState(new Map())


    const [calculated, setCalculated] = useState(false)

    const integer = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]



    return (
    <>
            <Row justify={"center"} className="mb-3">

                <Col xs={24} >
                    <Title style={{"textAlign":"center"}} level={4}>Algebra Gruppen</Title>
                    
                    <Row justify={"center"}>
                    <Col xs={8}>
                        <Row gutter={[8,8]}>
                        
                            <Col xs={24}>
                                <Row gutter={[8,0]}>
                                <Col xs={12}>
                                        <Select
                                            style={{width: "100%"}}
                                            onChange={(e) => 
                                                { setMenge(e); 
                                                if (e === "Zn"){
                                                    setOperation("+")
                                                    setNeutralElement(0)
                                                } else if (e === "Zn*"){
                                                    setOperation("*")
                                                    setNeutralElement("1")
                                                }}}
                                            options={[
                                                { value: 'Zn', label: '<ℤₙ, +ₙ, 0>' },
                                                { value: 'Zn*', label: '<ℤₙ*, ∙ₙ, 1>' },
                                            ]}
                                            placeholder={"Gruppe"}

                                        />
                                </Col>
                                <Col xs={12}>
                                        <Input 
                                            style={{"width" : "100%"}} 
                                            onChange={(e) => { setN(e.target.value) }} 
                                            placeholder='N'
                                        />
                                </Col>
                                
                                </Row>
                            </Col>
                            <Col xs={24}>
                                <Button disabled={menge === "" || operation === "" || n === 0 || !(n.split("").every(n => integer.includes(n)))} style={{"width" : "100%"}} onClick={() => { calculate() }} >Berechnen</Button>
                                
                            </Col>

                        </Row>
                    </Col>
                    </Row>
                
                </Col>
            </Row> 

         {/*shows the current group*/}
         {calculated && (
                <Row gutter={[24,16]} className="mt-4 mb-2" justify={"center"}>
                        
                        <Col xs={24}>
                            <Title style={{"textAlign" : "center"}} level={3}> Deine Gruppe: {"<"}ℤ
                            {/*n und * hinter dem Z*/}
                            {showMenge !== "Z" && (<sub style={{fontSize: 12}}>{showN}</sub>)}
                            {showMenge === "Zn*" && (<sup>*</sup>)}, 
                            {/*operator und kleines n hinter operator*/}
                            {showOperation==="*"?<>∙</>: <>+</>}
                            {showMenge !== "Z" && (<sub style={{fontSize: 12}}>{showN}</sub>)}, 
                            {/*neutrales element*/}
                            {showNeutral}{">"} </Title>
                        </Col>

                        <Col xs={Math.min(Math.max(showElements.size, 6), 16)}>
                                <Row gutter={[8,16]}>
                                    {Array.from(showElements).map(([key, value]) => {
                                  
                                    return (
                                        <Col xs={24}>
                                            <Row>
                                                <Col xs={12}>
                                                    <Title style={{"textAlign" : "left"}} level={5}>
                                                        {'<'} {key} {'>'}  {value.isErzeuger && ("(erzeuger)")}
                                                    </Title>
                                                </Col>
                                                <Col xs={12}>
                                                    <Title style={{"textAlign" : "center"}} level={5}>
                                                       {'<'} {value.erzeugnis.join(", ")} {'>'}
                                                    </Title>
                                                </Col>
                                            </Row>
                                        </Col>
                                    )
                                })}
                                </Row>
                        </Col>
                </Row>          
          )}
    </>
    )


    function calculate() {
        //n is the modulo value
        //i is the Erzeugnis that is currently being created (<i> = {...})
        //j is the value inside <i> currently being handled
        let elements = new Map()


        if (menge === 'Zn' && operation === '+'){ //aditive Gruppe mod n

            for (let i = 1; i < n; i++){
                const erzeugnis = []
                let j = 0

                do{
                    erzeugnis.push(j)
                    j = (j + i) % n
                } while (j !== 0)

                elements.set(i, {erzeugnis, isErzeuger : (erzeugnis.length === n)})
            }


        } else if (menge === 'Zn*' && operation === '*'){ //multiplikative Gruppe mod n

            for (let i = 1; i < n; i++){

                const erzeugnis = []

                if (gcd(i, n) === 1){

                    let j = 1

                    do{
                        erzeugnis.push(j)
                        j = (j * i) % n
                    } while (j !== 1)

                    elements.set(i, {erzeugnis, isErzeuger : erzeugnis.length === (n-1)})
                }
            }

        } 

        setShowElements(elements)
        setShowMenge(menge)
        setShowN(n)
        setShowNeutralElement(neutral)
        setShowOperation(operation)
        setCalculated(true)
}

    function gcd(a, b) {
        if (b === 0) {
          return a;
        } else {
          return gcd(b, a % b);
        }
      }
}

export default Groups