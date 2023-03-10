import React, { useState } from 'react'
import { Button, Input, Table, Row, Col, Space, Typography, Popover } from 'antd'

import {
  QuestionCircleOutlined
} from '@ant-design/icons';

import "./style.less"

const {Title, Text} = Typography


function TruthTable() {
  // hooks
  const [solved, setSolved] = useState(false)
  const [expr, setExpr] = useState("")
  // hooks for truthtable
  const [dataSource, setDataSource] = useState([])
  const [columns, setColumns] = useState([])
  const [inputValid, setInputValid] = useState(false)

  

  // legend
  const legend = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol"
    },
    {
      title: "DSolver",
      dataIndex: "dsolver",
      key: "dsolver",
      render: (text) => <code>{text}</code>,
    }
  ]

  // reduced instruction set
  const example = [
    {
      symbol: "∧",
      dsolver: "and"
    },
    {
      symbol: "∨",
      dsolver: "or"
    },
    {
      symbol: "→",
      dsolver: "impl"
    },
    {
      symbol: "¬",
      dsolver: "neg"
    },
    {
      symbol: "⊕",
      dsolver: "xor"
    },
    {
      symbol: "↔",
      dsolver: "xand"
    },
    {
      symbol: "nor",
      dsolver: "nor"
    },
    {
      symbol: "nand",
      dsolver: "nand"
    }
  ]
  
  // function that checkt wheater the input is valid or not
  // uses a whitelist to check if there are any illegal phrases
  // checks if there is an equal amount of parentheses
  function check(value){
    const allowed_keywords = 'abcdefghijklmnopqrstuvwxyz'.split('').concat([
      "and",
      "or",
      "impl",
      "neg",
      "xor",
      "xand",
      "nor",
      "nand",
    ])
    // chekc if there is an equal amount of opening and closing parentheses
    let amount_opening_parentheses = value.split("").filter(t => t === "(").length
    let amount_closing_parentheses = value.split("").filter(t => t === ")").length
    if (amount_closing_parentheses !== amount_opening_parentheses){
      setInputValid(false)
      return
    }


    // split the expression at every space and remove every parantehses
    const all_words = value.split(" ").filter(t => t !== "").map(t => t.replaceAll("(", "").replaceAll(")", ""))
    
    // console.log(all_words.every(t => !allowed_keywords.includes(t)))
    if(all_words.every(t => allowed_keywords.includes(t))){
      setInputValid(true)
    }
    else{
      setInputValid(false)
    }

  }

  // TODO fertig machen
  function solveTruthTable() {
    const expr_vars = getExprVars(expr)
    const expr_vars_values = createVarValues(expr_vars)

    let columns = []
    let dataSource = []

    // add collums
    for(let i = 0; i < expr_vars.length; i++){
      // adding colums
      let obj = {}
      obj["title"] = expr_vars[i]
      obj["dataIndex"] = expr_vars[i]
      obj["key"] = expr_vars[i]
      columns.push(obj)
    }
    columns.push({
      title: expr,
      dataIndex: "expr",
      key: "expr"
    })

    // add values 
    // calulate solution for given expression
    const result = solve(expr)
    for(let i = 0; i < expr_vars_values.length; i++){
      let obj = {}
      // add value for every variable
      for(let j = 0; j < expr_vars.length; j++){
        obj[expr_vars[j]] = expr_vars_values[i][j] ? 1 : 0
      }
      obj["expr"] = result[i] ?  1: 0
      dataSource.push(obj)
    }
    
    // set hooks
    setColumns(columns)
    setDataSource(dataSource)
    setSolved(true)
  }

  // function to extract all the expression variables form the string
  function getExprVars(expr){
    let expr_vars = []
    expr = expr.replaceAll("(", "").replaceAll(")", "").split(" ")
    for(let i = 0; i < expr.length; i++){
      if(expr[i].length === 1 && !expr_vars.includes(expr[i]) ){
        expr_vars.push(expr[i])
      }
    }
    return expr_vars.sort()
  }



  // funtction that 
  function normalize(exec) {
    return exec
      .replaceAll("xor", "!==")
      .replaceAll("nand", "") // TODO immer 1 wenn 0 und 0 dann auch 0
      .replaceAll("nor", "") // TODO wenn beide 0 dann true
      .replaceAll("xand", "===")
      .replaceAll("and", "&&")
      .replaceAll("or", "||")
      .replaceAll("impl", "") // TODO
      .replaceAll("not ", "-")
  }


  // function that returns a 2d array of every possible true / false
  // combinatorn for all given variabls
  function createVarValues(expr_vars){
    const amount_vars = Math.pow(2, expr_vars.length)
    let var_values = []
    for(let i = 0; i < amount_vars; i++){
        var_values.push((i >>> 0).toString(2))
    }
    return var_values.map(t => {
        while(t.length < expr_vars.length){
            t = "0" + t
        }
        return t
    })
    .map(t => {
        t = t.split("").map(f => f === "1")
        return t
    })
  }

  // solves the given expression
  function solve(expr) {
      const expr_vars = getExprVars(expr)
      const expr_vars_values = createVarValues(expr_vars)
      expr = normalize(expr)
      let solution = []

      // iterate over every possible combination of true and false values
      for(let i = 0; i < expr_vars_values.length; i++){
          let vars = ""
          // assign values to variables
          for(let v = 0; v < expr_vars.length; v++){
              vars += `let ${expr_vars[v]} = ${expr_vars_values[i][v]};\n`
          }
          eval(`${vars} solution.push(${expr})`)
      }
      return solution 
  }


  return (
    <>

      <Row justify={"center"} className="mb-3">

          <Col xs={24} >
              <Title style={{"textAlign":"center"}} level={4}>
                  Wahrheitstabelle 
              </Title>
              
              <Row justify={"center"}>
                <Col xs={8}>
                    <Row gutter={[8,8]}>
                      <Col xs={24}>
                          <Input  style={{"width" : "100%"}} 
                                  value={expr} 
                                  type={"text"} 
                                  onChange={(event) => {setExpr(event.target.value); check(event.target.value)}}
                                  placeholder="(a and b) -> (a xor c)"
                                  suffix={
                                    <a>
                                    <Popover  placement="bottom" title={"Guide"} content={<>
                                          <Table id="legend-table"
                                            pagination={false}
                                            dataSource={example}
                                            size="small"
                                            columns={legend}>
                                            tableLayout={"fixed"}
                                          </Table>
                                    </>} trigger="click">
                                       {"  "}<QuestionCircleOutlined  style={{"fontSize" : "14px"}}  />
                                    </Popover>  
                                    </a>
                                    }/>
                      </Col>
                      <Col xs={24}>
                            <Button  style={{"width" : "100%"}}  onClick={solveTruthTable} disabled={expr === "" || !inputValid}>Solve!</Button>
                      </Col>
                    </Row>
                </Col>
              </Row>

          </Col>
      </Row> 
      {solved && (
      <Row justify={"center"} className="mt-4">
          <Col xs={Math.min(columns.length*3, 24)}>
              <Table style={{"textAlign" : "center"}} 
                     id="truth-table"
                     size="small"  
                     pagination={false}
                     dataSource={dataSource} 
                     columns={columns}></Table>
            
          </Col>
      </Row>
      )}
   </>
  )
}

export default TruthTable