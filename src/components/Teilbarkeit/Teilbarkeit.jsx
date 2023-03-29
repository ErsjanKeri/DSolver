import React, { useState, useEffect, Fragment } from 'react'
import  { Button,  Row, Col, Input, Select, Upload, InputNumber, Typography, Dropdown, Space, Menu, message } from "antd"




const { Title, Text } = Typography;



function Teilbarkeit() {
  function isPrime(n){
    for(let i =2; i<100; i++){
      if(Math.pow(i, n-1)%n!==1){
        return false;
      }
    }
    return true;
  }

  //returns all prime numbers up to certain number
  function primes(n){
    let primes = [];
    for(let i=2; i<n; i++){
      let b = true;
      for(let j=0; j<primes.length; j++){
        if(i%primes[j]===0){
          b=false; 
          break;
        }
      
      }
      if(b){
        primes.push(i);
      }

    }
    return primes;
  }

  function primefactors(n){
    if(isPrime(n)){
      return n;
    }
    else{
      let possiblePrimes= primes((n/2)+1);
      let primeFactors = [];
      let i=0;
      while(i<possiblePrimes.length){
        if(n%possiblePrimes[i]==0){
          primeFactors.push(possiblePrimes[i]);
          n=n/possiblePrimes[i];
        }
        else{
          i++;
        }
      }
      return primeFactors;
      
    }
    
  }

  const [primesFinal, setPrimesFinal] = useState("");

  
    const [input, setInput] = useState("")
    const [calculated, setCalculated]= useState(false)
  
    


    function calculate(){
      
      if(input === ""){
          console.log("keine nummern eingegeben")
        }
        else{
          setPrimesFinal(primefactors(input));
          setCalculated(true);
          
        }
    }
  





    
    return (
    <> 
    

    <Row justify={"center"} className="mb-3">

        <Col xs={24} >
            <Title style={{"textAlign":"center"}} level={4}>Kombinatorik Calculator</Title>
            
                  <Row justify={"center"}>
              
              
                    <Col xs={24}>
                        <Row gutter={[8,0]}>
                          <Col xs={8}>
                              <InputNumber style={{"width" : "100%"}} value={input} onChange={(value) => {setInput(value)}} placeholder='n'/>

                          </Col>
                          
                          <Col xs={8}>
                              <Button  style={{"width" : "100%"}} type="primary" onClick={calculate} disabled={(input === "")}>Calculate</Button>
                            
                          </Col>
                        </Row>
                    </Col>
                  </Row>
        </Col> 
            </Row>
        
        
    {calculated && (
        <Row gutter={[0, 8]} justify={"center"} >
            <Title style={{"textAlign":"center"}} level ={3}>Primefactors: {primesFinal}</Title>
            <Text id ="primesFinal"></Text>
        </Row>
      )}
</>
  )

      
}

export default Teilbarkeit