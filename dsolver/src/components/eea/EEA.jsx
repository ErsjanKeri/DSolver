import React, { useEffect, useState } from 'react'
import {Button, InputNumber, Table} from "antd"
import "./index.css"
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
      title: "alpha",
      dataIndex: "alpha",
      key: "alpha"
    },
    {
      title: "beta",
      dataIndex: "beta",
      key: "beta"
    }
  ] 

  // initate hooks
  const [aInput, setAInput] = useState("")
  const [bInput , setBInput] = useState("")
  const [dataSource, setDataSource] = useState([])

  // Function thats calles on solve button press
  // checks if there are valid numbers
  // i think this check in useless since it's now working witht number-input-fields
  function solve(){
    if(aInput !== 0 || bInput !== 0){
      filleEaaTable();
    }
    else{
      console.log("keine nummern eingegegben")
    }
  }


  /*
    function that "prefills" the tabel with correct numbers
  */
  function filleEaaTable() {
    let data = []
    let a = aInput
    let b = bInput
    // add inital state to the dataSource
    data.push({
      a: a,
      b: b,
      intDivision: Math.floor(b/a),
      alpha: 0,
      beta: 0
    })

    
    // fill left half of the table until end condition is met
    while(b%a !== 0){
      let new_b = a
      let new_a = b%a

      a = new_a;
      b = new_b;
      
      data.push({
      a: a,
      b: b,
      intDivision: b%a == 0 ? "-" : Math.floor(b/a),
      alpha: 0,
      beta: 0
      })

    }

    // solve right part

    // update last 
    data[data.length - 1].alpha = 1
    data[data.length - 1].beta = 0
    
    // walk up rows
    for(let i = data.length - 1; i >= 1; i--){
      let alpha = data[i].alpha
      let beta = data[i].beta
      let intDiv = data[i-1].intDivision
      
      // set next values
      data[i - 1].alpha = beta - (intDiv * alpha)
      data[i - 1].beta = alpha
    }
    
    // update dataSource
    setDataSource(data)
  }


  return (
    <div className='container'>
        <h1>Erweiterter Euklidischer Algorithmus</h1>
        <form className='input_group'>
          <div className='input_number'>
            <InputNumber value={aInput} onChange={(value) => {setAInput(value)}} placeholder='a'/>
            <InputNumber value={bInput} onChange={(value) => {setBInput(value)}} placeholder='b'/>
          </div>
          <Button className="submit-btn" type="primary" onClick={solve}>Solve!</Button>
        </form>
        <hr/>
        <div id="stepButtons">
          <Button type="primary">Back</Button>
          <Button type="primary">Run</Button>
          <Button type="primary">Next</Button>
        </div>
        <Table id='eea_table' dataSource={dataSource} columns={collums} pagination={false} bordered={true}/>
    </div>
  )
}


export default EEA