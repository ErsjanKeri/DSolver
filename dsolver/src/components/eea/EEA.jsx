import React, { useState } from 'react'
import {Button, InputNumber, Table} from "antd"
import "./index.less"



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
    else{
      console.log("keine nummern eingegegben")
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
    setStates(states)
    setDataSource(states[counter])
    setSolved(true)
  }


  return (
    <div className='container'>
        <h1>Erweiterter Euklidischer Algorithmus</h1>
        <form className='input_group mb-2'>
          <div className='input_number'>
            <InputNumber value={aInput} onChange={(value) => {setAInput(value)}} placeholder='a'/>
            <InputNumber value={bInput} onChange={(value) => {setBInput(value)}} placeholder='b'/>
          </div>
          <Button className="submit-btn" type="primary" onClick={solve} disabled={(aInput === "" || bInput === "")}>Solve!</Button>
        </form>
        
        {solved ? (
          <div> 
            <div id="control_buttons">
              <Button id="back" onClick={() => {
                if(counter > 0){
                  setDataSource(states[counter - 1])
                  setCounter(counter - 1)
                }
              }}>Back</Button>

              <Button id="next" type="primary" onClick={() => {
                if(counter < states.length - 1){
                  setDataSource(states[counter + 1])
                  setCounter(counter + 1)
                }
              }}>Next</Button>

              <Button id="reveal" type="primary" onClick={() => {
                setDataSource(states[states.length - 1])
                setCounter(states.length - 1)
              }}>Reveal</Button>

            </div>

            <Table id='eea_table' 
              dataSource={dataSource} 
              columns={collums} 
              pagination={false} 
              bordered={true} 
              tableLayout={"fixed"} 
              size={"large"}/>
          </div> 
        ) : (<></>)}
       
    </div>
  )
}


/*
footer={() => {
                const lastState = dataSource[dataSource.length - 1]
                let alpha = lastState.alpha
                let beta = lastState.beta
                let a = lastState.a
                let b = lastState.b

                return `ggT 
                = α * a +  ß * b 
                = ${alpha} * ${a} 
                + ${beta} * ${a} 
                = ${alpha * a + beta * b}`
            }}
*/
export default EEA