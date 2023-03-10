import React, { useCallback, Fragment, useState, useEffect, useRef } from 'react'
import {Button, message, Row, Col, Input, Select, Upload, Typography } from "antd"
import { FunctionOutlined } from '@ant-design/icons'

import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomEdge from './CustomEdge';



const edgeTypes = {
  custom: CustomEdge,
};


const { Title } = Typography;


function DPLL() {
  //Push the user input inside of the list as the root of the tree

    const [userInput, setInput] = useState('')

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const [calculated, setCalculated] = useState(false)

    const handleChange = (event) => {
      setInput(event.target.value)
    }


    const handleClick = () => {
      var clauses = parseClauses(userInput)
      if (clauses.length > 0) {
        dpll_apply(clauses)
     
      }
    }
    
    /*function fetchInput(e) {
      var input = parseClauses(e)
      setInput(e)
    }*/

    function dpll_apply(clauses) {
      let root = new TreeNode(clauses, "mother", 0)
      var code = dpll_apply_step(root, 0)

      let ite = new makeTreeIterator(root)
      var result = ite.next()
      
      let x = 250
      let y = 0 
      let tNodes = []
      let tEdges = []
      
      let parent = null; 
      let parentNode = null;
      let index = 0

      let branches = [] // stack for branching 

      while (!result.done) {
        let node =  {
          id : ""+index++,
          data: {
            label: "{ " + result.node.value.map(subArr => `{${subArr.join(', ')}}`).join(', ') + " }",
          },
          position : { x : x, y : y}
        }
        
        
       
        if (result.node.info.includes("CASE") && parentNode !== null && parentNode.left !== null) {
          
          parentNode.left = null;
          branches.push(parentNode)
          branches.push(parent)
          node.position.x -= (200/(branches.length/2)+1)
          x = parent.position.x - (200/(branches.length/2)+1);

        }
      

        if (parent === null) {
          parent = node;
          parentNode = result; 
        } else {
          tEdges.push({
              id : "" + parent.id + "" + node.id,
              source: parent.id,
              target: node.id, 
              type: 'straight',
              label: result.node.info,
          })
          parent = node;
          parentNode = result; 
        }

        if (JSON.stringify(result.node.value) === "[[]]" && branches.length > 0) {
          parent     = branches.pop()
          parentNode = branches.pop()
          y = parent.position.y 
          x = parent.position.x + (200/((branches.length/2)+1))
        }
        //if (result.)

        //x;
        y += 100
        tNodes.push(node)
        result = ite.next()
      } 

      setNodes(tNodes)
      setEdges(tEdges)

      switch (code) {
        case -1, -2: 
          message.error('Please hold on to given format!')
          break
        default: break
      }
      setCalculated(true)
    }
    
    return (
 <>


          <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Title style={{"textAlign":"center"}} level={4}>DPLL</Title>

              </Col>
              <Col xs={20}>
                  <Input 
                        placeholder={`{a, !b, c}, {a, b}, {d}, {!a, !d}`}
                        onChange = {handleChange}/>
              </Col>

              <Col xs={4}>
                  <Button 
                         style={{"width" : "100%"}}
                            onClick={() => handleClick()}
                            >
                              Apply
                    </Button>
              </Col>
          </Row>

            {calculated && (
              <Row className='mt-4'>
                <Col xs={24} style={{ width: '100vw', height: '70vh' }}>
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      snapToGrid={true}
                      edgeTypes={edgeTypes}
                      fitView
                      deleteable={false}
                      attributionPosition="top-right"
                    >
                      <MiniMap />
                      <Controls />
                      <Background />
                    </ReactFlow>

                </Col>
            </Row>
            )}
        
          </>      
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

  function dpll_apply_step(mother) {
    //error -1:: not in the format I want (2D-Array) or the mother is not an instance of tree
    if (mother instanceof TreeNode === false) return - 1

    var klauseln = mother.value
    var letter


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
      
      if (Array.isArray(letter)) letter = letter[0]
      //letter = letter[0] //letter gets recognised as array of size 1
    
      mother.middle = new TreeNode(dpll_reduce(klauseln, letter), "OLR: " + letter, mother)
      return dpll_apply_step(mother.middle)
    }

    //check for PLR Rule
    let pureLiterals = []
    findPure(klauseln, pureLiterals)
    if (pureLiterals.length !== 0) {
      letter = determineLiteraryFirst(pureLiterals)
      
      mother.middle = new TreeNode(dpll_reduce(klauseln, letter), "PLR: " + letter, mother)
      return dpll_apply_step(mother.middle)
    }

    //literary steps

    //positive
    var positiveLits = posLitArray(klauseln)
    var negatvieLits = negLitArray(klauseln)
    letter = positiveLits[0]

    mother.left = new TreeNode(dpll_reduce(klauseln, letter), "CASE: " + letter, mother )
    var code = dpll_apply_step(mother.left)
    if (code === 1) return 1 //empty clauses set, success
    
    //negative
    //-3 means continue
    if (code === -3) {
      letter = negatvieLits[0]

      mother.right = new TreeNode(dpll_reduce(klauseln, letter), "CASE: " + letter, mother)
      return dpll_apply_step(mother.right)
    }
  }


  //adds to the given array the klausel with only one literal
  function addIfOne(arr, clauses) {
    if (clauses.length === 1) {
        arr.push(clauses[0])
    }
  }

  //returns the literal which has literary priority
  function determineLiteraryFirst(literals) {
    if (!Array.isArray(literals) || literals.length === 0) return ''

  
    var positives = literals.filter(n => !n.includes('!')).sort()
    var negatives = literals.filter(n => n.includes('!')).sort()

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

    let copyClauses = []
    if (Array.isArray(klauseln)) {
      for (let index = 0; index < klauseln.length; index++) {
        copyClauses.push([...klauseln[index]])
      }
    }

    //clear the ones that contains this literal
    for (let index = 0; index < copyClauses.length; index++) {
        if (copyClauses[index].includes(literal)) {
          copyClauses.splice(index--, 1)
        }
    }

    //clear opposite literals in the rest
    var reverseLiteral = literal.includes('!') ? literal.replace('!', '') : "!" + literal
    
    copyClauses.forEach(element => {
      var index = element.indexOf(reverseLiteral)
      if (index !== -1) element.splice(index, 1)
    })

    return copyClauses
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
      var reverseLiteral = element.includes('!') ? element.replace('!', '') : "!" + element
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
    return Array.from(makeASet(clauses)).filter(n => !n.includes('!')).sort()
  }
 //returns a sorted array containing only negative literals
  function negLitArray(clauses) {
    return Array.from(makeASet(clauses)).filter(n => n.includes('!')).sort()
  }

  class TreeNode{
    constructor(value, info, mother){
        this.mother = mother
        this.value = []
        if (Array.isArray(value)) {
          for (let index = 0; index < value.length; index++) {
            this.value.push([...value[index]])
          }
        }
        this.info = info
        this.left = null
        this.right = null
        this.middle = null
    }
  }

  function makeTreeIterator(root) {
    let stack = []
    let current = root

    const treeIterator = {
      next() {
        let res
        if (current !== null) {
          res = {node: current, done: false}

          if (current.middle !== null) current = current.middle

          else if (current.left !== null || current.right !== null) {
            if (current.left !== null) {
              
              if (current.right !== null) {
                stack.push(current.right)
              }

              current = current.left
            } 
            else {
              current = current.right
            }

          }

          else if (stack.length !== 0) {
            current = stack.pop()
          }

          else {
            current = null
          }

          return res
        }
        
        return {node: [], done: true}
      }
    }

    return treeIterator
  }
  
  export default DPLL