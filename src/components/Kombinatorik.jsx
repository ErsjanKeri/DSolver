import React, { useState, useEffect, Fragment } from 'react'
import  { Button,  Row, Col, Input, Select, Upload, InputNumber, Typography, Dropdown, Space, Menu, message } from "antd"
import { useTranslation } from 'react-i18next';




const { Title, Text } = Typography;



function Kombinatorik() {

    const { t } = useTranslation()
  
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
  
    // map of maps for each calc method
    const memo1 = new Map();
    const memo2 = new Map();
    const memoP = new Map();
  
    function calcs1(n, k){
      if(n===k){  
        return 1;
      }
      if(n===0|k===0){
        return 0;
      }
      if(memo1.has(n)) {
         if(memo1.get(n).has(k)) {
          return memo1.get(n).get(k);
         }
      } else {
        memo1.set(n, new Map());
      }
  
      memo1.get(n).set(k, calcs1(n-1, k-1) + calcs1(n-1,k)*(n-1));
      return memo1.get(n).get(k);
    }

    function calcs2(n, k){
      if(n===k){
        return 1;
      }
      if(n===0|k===0){
        return 0;
      }
      
      if(memo2.has(n)) {
         if(memo2.get(n).has(k)) {
          return memo2.get(n).get(k);
         }
      } else {
        memo2.set(n, new Map());
      }
  
      memo2.get(n).set(k, calcs2(n-1, k-1)+ calcs2(n-1, k)*k);
      return memo2.get(n).get(k);
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
      
      if(memoP.has(n)) {
         if(memoP.get(n).has(k)) {
          return memoP.get(n).get(k);
         }
      } else {
        memoP.set(n, new Map());
      }
  
      memoP.get(n).set(k, calcp(n-1,k-1)+calcp(n-k, k));
      return memoP.get(n).get(k);
    }



    
    return (
    <> 
    

    <Row justify={"center"} className="mb-3">

        <Col xs={24} >
            <Title style={{"textAlign":"center"}} level={4}>{t("combinatorics")}</Title>
            
            <Row justify={"center"}>
              <Col md={8} sm={16} xs={24}>
                  <Row gutter={[8,8]}>
                    <Col xs={24}>
                        <Select
                            style={{"width" : "100%"}}
                            onChange={(e) => { setKind(e) }}
                            options={[
                                { value: 's1', label: t("stirling-numbers-1") },
                                { value: 's2', label: t("stirling-numbers-2") },
                                { value: 'p', label: 'P_(n,k)' },
                            ]}
                            placeholder={`${t("select")}...`}
                        />
                    </Col>
                    <Col xs={24}>
                        <Row gutter={[8,8]}>
                          <Col sm={8} xs={12}>
                              <InputNumber style={{"width" : "100%"}} value={nInput} onChange={(value) => {setNInput(value)}} placeholder='n'/>

                          </Col>
                          <Col sm={8} xs={12}>
                              <InputNumber style={{"width" : "100%"}} value={kInput} onChange={(value) => {setKInput(value)}} placeholder='k'/>
                            
                          </Col>
                          <Col sm={8} xs={24}>
                              <Button  style={{"width" : "100%"}} type="primary" onClick={calculate} disabled={(nInput === "" || kInput === "" ||kind === "")}>{t("solve")}</Button>
                            
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
