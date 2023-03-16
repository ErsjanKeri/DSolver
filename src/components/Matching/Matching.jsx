import React, { useState } from "react";

import { Col, Divider, Row, Typography, Button, Space } from "antd";

import Preferenzen from "./Preferenzen";

const { Title, Text } = Typography


function generateMatrix(length, letter) {
    let items = []
   
    for (let i = 0; i < length; i++) {
        let preferenzen = []

        for (let j = 0; j < length; j++) {
            preferenzen.push({
                id : j.toString(),
                content : `${letter}${j}`,
                matched : false,        // if true then square
                highlighted : false,    // if true then red 
                done : false,           // if true then opacity 0.5
            })
        }
        items.push(preferenzen)
    }
    return items
}




export default function Matching() {
    const [initialLength, setInitialLength] = useState(4)

    // female matrix
    const [matrixA, setMatrixA] = useState(generateMatrix(initialLength, "B"))
    // male matrix
    const [matrixB, setMatrixB] = useState(generateMatrix(initialLength, "A"))

    const [priorA, setPriorA] = useState(null)
    const [priorB, setPriorB] = useState(null)

     


    const [calculated, setCalculated] = useState(false)
    const [states, setStates] = useState([]) 
    const [erklarung, setErklarung] = useState("")
    const [currentState, setCurrentState] = useState(0) // index of current state 

    /*
    state = {
        desc : Description of what this step does
        matrixA : matrixA at this stage
        matrixB : matrixB at this stage
    }
    */

    const reset = () => {
        setCalculated(false)
        setStates([])
        setCurrentState(0)
        // to put the state as it was before input 
        setMatrixA(priorA)
        setMatrixB(priorB)
    }

    const calculate = () => {
        setCalculated(true)

        setPriorA(copy2DArray(matrixA))
        setPriorB(copy2DArray(matrixB))

        let men     = matrixA
        let women   = matrixB

        const myStates = []


        let matches = 0; // how many are matched


        while (matches < initialLength) {
            // get the first not matched woman 
            
            for (let i = 0; i < women.length; i++) {
                if (!isMatched(women[i])) {
                    // getting first not matched 
                    // highlighting first viable 
                    let highestPref = highlight(women[i]);
                    let description = match(highestPref, i)
                    myStates.push({
                        desc : description,
                        matrixA : copy2DArray(men),
                        matrixB : copy2DArray(women),
                    })
                    women[i][women[i].findIndex(obj => obj.id === highestPref.toString())].highlighted = false; 
                }

            }
    
        }


        setMatrixA(myStates[0].matrixA)
        setMatrixB(myStates[0].matrixB)
        setErklarung(myStates[0].desc)
        setStates(myStates)


        function isMatched(prefs) {
            for (let i = 0; i < prefs.length; i++) {
                if (prefs[i].matched) {
                    return true;
                }
            }
            return false; 
        }

        function copy2DArray(originalArray) {
            const numRows = originalArray.length;
            const numCols = originalArray[0].length;
            
            // Create a new 2D array with the same dimensions as the original
            const newArray = new Array(numRows);
            for (let i = 0; i < numRows; i++) {
              newArray[i] = new Array(numCols);
            }
            
            // Copy each object in the original array to the corresponding position in the new array
            for (let i = 0; i < numRows; i++) {
              for (let j = 0; j < numCols; j++) {
                newArray[i][j] = Object.assign({}, originalArray[i][j]);
              }
            }
            
            return newArray;
        }

        function highlight(prefs) {
            for (let i = 0; i < prefs.length; i++) {
                if (!prefs[i].done) {
                    prefs[i].highlighted = true 
                    return prefs[i].id;
                }
            }
        }

        function match(manIndex, womanId) {
            // we need index to know which man it is 
            let requestIndex = men[manIndex].findIndex(obj => obj.id === womanId.toString());    // index of woman 
            let alreadyIndex = men[manIndex].findIndex(obj => obj.matched === true);    // index of already engaged woman 
            let description = ""

            if (alreadyIndex !== -1) {
                // if already matched 

                if (requestIndex < alreadyIndex) {
                    console.log(`MI: ${manIndex} ${requestIndex}  ${alreadyIndex}` )
                    let toBeHeartBroken = men[manIndex][alreadyIndex].id  

                    // break the current match
                    men[manIndex][alreadyIndex].matched = false;                 
                    women[toBeHeartBroken][women[toBeHeartBroken].findIndex(obj => obj.id === manIndex.toString())].matched = false;
                    women[toBeHeartBroken][women[toBeHeartBroken].findIndex(obj => obj.id === manIndex.toString())].done = true;
                    
                    men[manIndex][requestIndex].matched = true; 
                    women[womanId][women[womanId].findIndex(obj => obj.id === manIndex.toString())].matched = true

                    // return `Unmatching A${manIndex} mit B${toBeHeartBroken}, and matching B${womanId} mit A${manIndex}`
                    return `Entmatchen von A${manIndex} und B${toBeHeartBroken} und B${womanId} und A${manIndex} matchen.`
                }
                
                women[womanId][manIndex].done = true; 
                // return `Cannot match B${womanId} mit A${manIndex}, weil A${manIndex} prefers B${men[manIndex][alreadyIndex].id} more als B${womanId}`
                return `A${manIndex} kann nicht mit B${womanId} gematched werden, da A${manIndex} B${men[manIndex][alreadyIndex].id} gegenüber B${womanId} bervorzugt.`


            } else {
                // match for the first time 
                men[manIndex][requestIndex].matched = true; 
                women[womanId][women[womanId].findIndex(obj => obj.id === manIndex.toString())].matched = true
            
                matches++;
                // return `Matching A${manIndex} mit B${womanId}, weil A${manIndex} noch nicht gematched ist`; 
                return `A${manIndex} und B${womanId} matchen, da A${manIndex} noch nicht gematched wurde.`; 
            }
        }
    }


    return (
        <Row justify={"center"} className="mb-3">

            <Col xs={24}>
                <Title style={{textAlign:"center"}} level={4}>Gale-Shapley-Algorithmus</Title>

                <Row justify={"center"} >
                    <Col lg={14} >
                        <Row gutter={[64, 16]}>
                            <Col lg={12} xs={24}>
                                <Preferenzen calculated={calculated} letter={"A"} matrix={matrixA} setMatrix={setMatrixA}/>
                            </Col>

                            <Col lg={12} xs={24}>
                                <Preferenzen calculated={calculated} letter={"B"} matrix={matrixB} setMatrix={setMatrixB} />
                            </Col>
                        
                        </Row>
                    </Col>

                    <Col lg={16} md={24} sm={24} xs={24} className="mt-4">

                        <Row gutter={[32, 8]}>
                            <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                                <Row gutter={[8,8]}>
                                    <Col lg={12} md={12} sm={12} xs={24}>
                                        <Button style={{"width" : "100%"}} danger disabled={!calculated} onClick={() => { reset() }}>Zurücksetzen</Button>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={24}>
                                        <Button style={{"width" : "100%"}} disabled={calculated} onClick={() => { calculate() }}>Berechnen</Button>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xl={14} lg={24} md={24} sm={24} xs={24}>
                                <Row gutter={[8,0]}>
                                    <Col lg={8} sm={8} xs={8}>
                                            <Button style={{"width" : "100%"}} disabled={!calculated || currentState === states.length-1} onClick={() => {
                                                setMatrixA(states[states.length-1].matrixA)
                                                setMatrixB(states[states.length-1].matrixB)
                                                setErklarung(states[states.length-1].desc)
                                                setCurrentState(states.length-1)
                                                }}>Lösen</Button>  
                                        </Col>
                                        <Col lg={8} sm={8} xs={8}>
                                            <Button style={{"width" : "100%"}} disabled={!calculated || currentState<1}  
                                                onClick={() => { 

                                                setMatrixA(states[currentState-1].matrixA)
                                                setMatrixB(states[currentState-1].matrixB)
                                                setErklarung(states[currentState-1].desc)
                                                setCurrentState(currentState-1)

                                                
                                            }}>Zurück</Button>
                                        </Col>
                                        <Col lg={8} sm={8} xs={8}>
                                                <Button style={{"width" : "100%"}} disabled={!calculated || currentState === states.length-1} onClick={() => { 
                                                setMatrixA(states[currentState+1].matrixA)
                                                setMatrixB(states[currentState+1].matrixB)
                                                setErklarung(states[currentState+1].desc)
                                                setCurrentState(currentState+1)
                                                
                                            }}>Weiter</Button>
                                        </Col>

                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                 {calculated && (
                    <Title className="mt-4" style={{"textAlign":"center"}} level={5}>{erklarung}</Title>
                 )}
                
            
            
            </Col>
        </Row>
     
   
    );
  
}

