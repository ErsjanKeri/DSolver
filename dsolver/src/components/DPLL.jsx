import React, { Fragment, useState, useEffect, useRef } from 'react'
import {Button, message, Row, Col, Input, Select, Upload, Typography } from "antd"
import { FunctionOutlined } from '@ant-design/icons'

function DPLL() {
  //Push the user input inside of the list as the root of the tree
    console.log('main func')

    const [userInput, setInput] = useState('')
    const inputRef = useRef(null)

    const handleClick = () => {
      console.log('I dunno')
      setInput(inputRef.current.value)
      var clauses = parseClauses(userInput)
      console.log(clauses)
      if (Array.isArray(clauses) && clauses.length > 0) {
        dpll_apply(clauses)
        console.log('I have the power')
      }
    }
    
    /*function fetchInput(e) {
      var input = parseClauses(e)
      setInput(e)
    }*/

    function dpll_apply(clauses) {
      let root = new TreeNode(clauses)
      var code = dpll_apply_step(clauses, root)

      switch (code) {
        case -1, -2: 
          message.error('Please hold on to given format!')
          break
        default: break
      }
    }
    
    return (
      <div class="container">
        <div class="header">
          <Typography.Title className={"mb-2"} level={3}>DPLL</Typography.Title>
        </div>

        <div class="user_input">
          <Row gutter={[12,12]} className="form-input">
              <Col xl={22} lg={21} md={20} sm={19} xs={18}>
                <Input
                  ref={inputRef}
                  name='clauses'
                  placeholder={`example: {a, !b, c}, {a, b}, {d}, {!a, !d}`}
                  //onChange={(e) => { fetchInput(e) }}
                  />
              </Col>

              <Col xl={2} lg={3} md={4} sm={5} xs={6}>
                  <Button style={{width: "100%"}}
                          onClick={() => handleClick()}
                          >
                            Apply
                  </Button>
              </Col>
          </Row>            
        </div>

        <div class="graphics">

        </div>
      </div>
    )

   
  }

  //to parse user input in 2d Array
  function parseClauses(input) {
    var clausesArr = []
    try {
      var raw1 = input.split('}')
      raw1.forEach(element => {

        var clause = element.replace('{', '').replaceAll(' ', '')
        clausesArr.push(clause.split(',').filter(n => n.length != 0))
      })
    } catch (exception) {
      return []
    }
    clausesArr.pop()
    return clausesArr
  }

  function dpll_apply_step(klauseln, mother) {
    
    var letter
    //error -1:: not in the format I want (2D-Array) or the mother is not an instance of tree
    if (!Array.isArray(klauseln)) return -1
    if (mother instanceof TreeNode === false) return - 1

    //success, all of them are satisfied
    if (klauseln.length === 0) return 1

   
    //error -2: not an array inside
    if (!Array.isArray(klauseln[0])) return -2
    //error -3: go back, not satisfiable 
    if (contains_empty(klauseln)) return -3
    
    //check for OLR Rule
    let klauselnMitOne = []
    klauseln.forEach(element => addIfOne(klauselnMitOne, element)) //add klauseln with only one literal

    //if there is, determine the one with highest priority 
    if (klauselnMitOne.length !== 0) {
      letter = determineLiteraryFirst(klauselnMitOne)
      mother.middle = new TreeNode(dpll_reduce(klauseln, letter))
      return dpll_apply_step(klauseln, mother.middle)
    }

    //check for PLR Rule
    let pureLiterals = []
    findPure(klauseln, pureLiterals)
    if (pureLiterals.length !== 0) {
      letter = determineLiteraryFirst(pureLiterals)
      mother.middle = new TreeNode(dpll_reduce(klauseln, letter))
      return dpll_apply_step(klauseln, mother.middle)
    }


    //apply dpll literary
    var positiveLits = posLitArray(klauseln)
    var negatvieLits = negLitArray(klauseln)
    letter = positiveLits[0]
    mother.left = new TreeNode(dpll_reduce(klauseln, letter))
    
    var code = dpll_apply_step(klauseln, mother.left)
    if (code === 0) return 0
    //-3 means continue
    if (code === -3) {
      letter = negatvieLits[0]
      mother.right = new TreeNode(dpll_reduce(klauseln, letter))
      return dpll_apply_step(klauseln, mother.right)
    }
  }


  //adds to the given array the klausel with only one literal
  function addIfOne(arr, clauses) {
  
    if (clauses.length === 1) {
        arr.push(clauses)
    }
  }

  //returns the literal which has literary priority
  function determineLiteraryFirst(literals) {
    if (!Array.isArray(literals) || literals.length === 0) return ''

    var positives = literals.filter(n => !n.includes('!')).sort
    var negatives = literals.filter(n => n.includes('!')).sort

    //check if either of the literal arrays are empty
    if (positives.length === 0 || negatives.length === 0 ) {
      return positives.length === 0 ? negatives[0] : positives[0]
    }

    var reversedNeg = negatives[0].replace('!', '')
    //compare the first letters of negative and positives, return the smaller (alphabeticely higher) one
    return reversedNeg.localeCompare(positives[0]) ? negatives[0] : positives[0]
  }

  //reduces the set with given literal
  function dpll_reduce(klauseln, literal) {
    //clear the ones that contains this literal
    for (let index = 0; index < klauseln.length; index++) {
        if (Array.isArray(klauseln[index]) && klauseln[index].includes(literal)) {
            klauseln.splice(index--, 1)
        }
    }

    //clear opposite literals in the rest
    var reverseLiteral = literal.includes('!') ? literal.replace('!', '') : literal = "!" + literal
    
    klauseln.forEach(element => {
      var index = element.indexOf(reverseLiteral)
      if (index !== -1) element.splice(index, 1)
    })

    return klauseln
  }


  //check if the step contains an empty klausel, if so return --> not satisfiable
  function contains_empty(clauses) {
    if (Array.isArray(clauses)) {
      var res = false;
      clauses.forEach(element => {
        if (Array.isArray(element) && element.length === 0) {
          res = true
        }
      })
      return res
    }
    return false
  }

  //adds to given array the literals according to Pure-Line-Rule
  function findPure(clauses, pureList) {
    var listLiterals = makeASet(clauses)

    listLiterals.forEach(element =>  {
      var reverseLiteral = element.includes('!') ? element.replace('!', '') : element = "!" + element
      if (!containsLiteral(clauses, reverseLiteral)) {
        pureList.push(element)
      }
    })
  }

  function containsLiteral(clauses, literal) {
    var res = false
    clauses.forEach(elementArray => {
      if (elementArray.includes(literal)) res = true
    })
    return res
  }

  function makeASet(clauses) {
    if (Array.isArray(clauses)) {
      var res = new Set();
      
      clauses.forEach(elementArr => {
        elementArr.forEach(elementIn => res.add(elementIn))
      })

      return res;
    }

    return new Set()
  }

  //returns a sorted array containing only positive literals
  function posLitArray(clauses) {
     return Array.from(makeASet(clauses)).filter(n => !n.includes('!')).sort
  }
  //returns a sorted array containing only negative literals
  function negLitArray(clauses) {
    return Array.from(makeASet(clauses)).filter(n => n.includes('!')).sort
  }

  class TreeNode{
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
        this.middle = null
    }
  }
  
  export default DPLL