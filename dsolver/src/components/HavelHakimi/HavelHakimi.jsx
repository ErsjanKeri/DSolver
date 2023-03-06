import React, { useState, useEffect } from 'react'

import { Row, Col, Typography, Button, Input } from "antd"


import HavelGraph from './HavelGraph';

import './styles.css'


const { Title, Text } = Typography;






function HavelHakimi() {
    const [userInput, setUserInput] = useState("")
    const [rawFolge, setRawFolge] = useState([])
    const [represantable, setRepresentable] = useState(false)
    // copy of raw folge, but we will empty raw folge 
    const [result, setResult] = useState([])


    const [graphs, setGraphs] = useState([])
    const [calculated, setCalculated] = useState(false)

    useEffect(() => {
      console.log(result)
      console.log(graphs)
    }, [result])

    function calculateHakimi() {
      

      function rekursivHak(gradFolge) {
          rawFolge.push(gradFolge.slice())
          setRawFolge(rawFolge)

          // Abbruchbedingung, nicht realisierbar
          if (gradFolge[gradFolge.length - 1] > gradFolge.length - 1 || gradFolge[0] < 0) {
              console.log(gradFolge);
              return false;
          }
        
          // Abbruchbedingung, realisierbar
          if (gradFolge[gradFolge.length - 1] === 0) {
              return true;
          }
        
          let last = gradFolge[gradFolge.length - 1];
          let index = gradFolge.length - 2;
        
          while (last > 0) {
              gradFolge[index] = gradFolge[index] - 1;
              index -= 1;
              last -= 1;
          }
        
          gradFolge.pop();
        
          return rekursivHak(gradFolge.sort());
      }

      const doable = rekursivHak(userInput.match(/\d+/g).map(Number))
      
      if (doable) {
        setRepresentable(true)
        generateGraphs(rawFolge)
      } else {
        setRepresentable(false)
        setGraphs([])
      }
      setCalculated(true)
      setResult(rawFolge)
      setRawFolge([])
    }
  

    function generateGraphs(raw) {
        const folge = raw.slice().reverse(); 
        const tempGraphs = []

        for (let i = 0; i < folge.length; i++) {
            let nodes = [] // nodes will always be first generated 
            let edges = i == 0 ? [] : tempGraphs[i-1].edges

            let radius = 100 + ((folge[i].length/8) * 100);  // todo change this according to number of nodes

            // adding the initial nodes
            for (let j = 0; j < folge[i].length; j++) {
                let angle = j * (2 * Math.PI / folge[i].length);
                let x = radius * Math.cos(angle);
                let y = radius * Math.sin(angle);

                nodes.push({
                  title: j.toString(),
                  type: "circle",
                  x: x,
                  y: y
                })
            }

            if (i > 0) {
              // between 0s and 1s 
              const toAdd = [];
              
              for (let j = 0; j < folge[i-1].length; j++) {
                  toAdd.push(folge[i][j] - folge[i-1][j]);
              }

              for (let j = 0; j < toAdd.length; j++) {
                  if (toAdd[j] == 1) {
                      edges.push({
                        source: (folge[i].length-1).toString(), // latest point
                        target: (j).toString(),        // prior 
                        type: "emptyEdge"
                      })
                  }
              }

            } else {
              let priorIndex = 1
              for (let j = 0; j < folge[i][folge[i].length-1]; j++) {
                  edges.push({
                    source: (folge[i].length-1).toString(), // latest point
                    target: (folge[i].length-i-priorIndex).toString(),        // prior 
                    type: "emptyEdge"
                  })
                  priorIndex++;
              }
            }
            tempGraphs.unshift({nodes, edges, folge: folge[i]})
        }
        
        setGraphs(tempGraphs)
    }

    return (
      <>
          <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Title style={{"textAlign":"center"}} level={4}>Havel Hakimi Algorithm</Title>

              </Col>
              <Col xs={20}>
                  <Input 
                  
                    placeholder='(1,2,3,4,5,6,7,8)'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}


                  />
                
              </Col>

              <Col xs={4}>
                  <Button
                    style={{"width" : "100%"}}
                    onClick={() => {
                      calculateHakimi()
                    }}
                  >
                    Calculate</Button>
              </Col>
          </Row>

          {calculated  && (
            
          <Row gutter={[16,16]} className="mt-4">
                <Col xs={24}>
                    <Title style={{"textAlign" : "center"}} level={4}>{represantable ? ("Doable :)") : ("Not Doable :(")}</Title>
                </Col>

                {(result !== []) && (
                      result.map((r, i) => {
                           return (
                            <Col xs={24}>
                              <Row className='mb-1'>
                                
                                <Col xs={24}>
                                    <Title style={{"marginBottom" : "5px", "paddingBottom" : "0"}} level={5}>Step-{i+1}: ({r.join(", ")})</Title>
                                </Col>
                                
                                  {represantable && (<>
                                      <Col xs={24}>
                                        <HavelGraph nodes={graphs[i].nodes} edges={graphs[i].edges} />
                                      </Col>
                                  </>)}
                               
                              </Row>
                            </Col>
                           )
                      })
                )}
            
          </Row>
        )}


      </>
    )
}






export default HavelHakimi