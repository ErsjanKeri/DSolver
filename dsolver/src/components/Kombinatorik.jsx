import React, { useState, useEffect, Fragment } from 'react'
import  { Button,  Row, Col, Input, Select, Upload, InputNumber, Typography, Dropdown, Space, Menu, message } from "antd"




const { Title, Text } = Typography;



function Kombinatorik() {
  
    const [kind, setKind] = useState("")
    const [calculated, setCalculated] =useState(false);
    const [result, setResult] = useState(0);

    const [calcN, setCalcN]= useState(0);
    const [calcK, setCalcK]= useState(0);
    const [calcKind, setCalcKind] = useState("")

    
    const [kInput, setKInput] = useState("")
    const [nInput , setNInput] = useState("")
    
    


    function calculate(){
      
      if(nInput === "" || kInput === "" || kind ===""){
          console.log("keine nummern eingegeben")
        }
        else{
      
          if(kind === 's1'){
              setResult(calcs1(nInput, kInput));
              setCalcKind('s');

          }
          else if(kind === 's2' ){
            setResult(calcs2(nInput, kInput));
            setCalcKind('S');

          }
          else if(kind === 'p'){
            setResult(calcp(nInput, kInput));
            setCalcKind('P');

          }
          
          setCalcK(kInput)
          setCalcN(nInput)
          setCalculated(true);
          
        }
    }
    function calcs1(n, k){
      if(n===k){
          return 1;
      }
      if(n===0|k===0){
          return 0;
      }
      return calcs1(n-1, k-1) + calcs1(n-1,k)*(n-1)

    }

    function calcs2(n, k){
      if(n===k){
        return 1;
      }
      if(n===0|k===0){
        return 0;
    }
  return calcs2(n-1, k-1)+ calcs2(n-1, k)*k;
    }

    function calcp(n, k){
      if(n===k){
        return 1;
      }
      if(k>n){
        return 0;
      }
      if(k===0){
        return 0;
      }
      return calcp(n-1,k-1)+calcp(n-k, k);
    }



    
    return (
    <> 
    

    <Row justify={"center"} className="mb-3">

        <Col xs={24} >
            <Title style={{"textAlign":"center"}} level={4}>Kombinatorik Calculator</Title>
            
            <Row justify={"center"}>
              <Col xs={8}>
                  <Row gutter={[8,8]}>
                    <Col xs={24}>
                        <Select
                            style={{"width" : "100%"}}
                            onChange={(e) => { setKind(e) }}
                            options={[
                                { value: 's1', label: 'Stirling Zahlen 1. Art' },
                                { value: 's2', label: 'Stirling Zahlen 2. Art' },
                                { value: 'p', label: 'P n,k' },
                            ]}
                            placeholder={"Auswählen..."}
                        />
                    </Col>
                    <Col xs={24}>
                        <Row gutter={[8,0]}>
                          <Col xs={8}>
                              <InputNumber style={{"width" : "100%"}} value={nInput} onChange={(value) => {setNInput(value)}} placeholder='n'/>

                          </Col>
                          <Col xs={8}>
                              <InputNumber style={{"width" : "100%"}} value={kInput} onChange={(value) => {setKInput(value)}} placeholder='k'/>
                            
                          </Col>
                          <Col xs={8}>
                              <Button  style={{"width" : "100%"}} type="primary" onClick={calculate} disabled={(nInput === "" || kInput === "" ||kind === "")}>Calculate</Button>
                            
                          </Col>
                        </Row>
                    </Col>
                  </Row>
              </Col>
            </Row>
        
        </Col>
    </Row> 
    {calculated && (
        <Row gutter={[0, 8]} justify={"center"} >
            <Title style={{"textAlign":"center"}} level ={3}>{calcKind}<sub>{calcN},{calcK}</sub> = {result}</Title>
        </Row>
      )}
</>
  )

      
}

export default Kombinatorik