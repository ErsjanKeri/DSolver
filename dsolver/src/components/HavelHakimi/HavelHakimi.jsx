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

    const [eigenschaften, setEigenschaften] = useState([])


    function calculateHakimi() {

      const gradArr = (userInput.match(/\d+/g).map(Number)).sort();
      
      const doable = rekursivHak(gradArr.slice())

      findEigenschaften(gradArr.slice())

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
      console.log(eigenschaften)
    }
  
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


    function findEigenschaften(gradArr) {
        const E = gradArr.length-1 && gradArr.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0)/2;
        const V = gradArr.length;


        // zusammenhangend
        // δ(G) + ∆(G) ≥ n − 1,
      
        // nicht zusammenhangend 
        // |E| ≥ |V| - 1, falls nicht erfullt, dann nicht zhangend 
        // wenn beide 1s dann zhangend, sonst nicht 
        let zusammenhangend = gradArr[0]+gradArr[gradArr.length-1] >= gradArr.length-1 && E >= V-1;
       

        // falls |E| ≥ |V|, dann hatkreis (wenn nicht erfullt unklar)
        let hatKreis = E >= V; 


        // eulertour 
        // zusammenhangend + gerade grad
        let hatEulertour = zusammenhangend && checkEulertour(gradArr); 


        // hamiltonkreis 
        let hatHamiltonkreis = zusammenhangend && V >= 3 && checkHamilton(gradArr);


        // ist nicht planar
        // falls |E| <= 3|V| - 6, dann planar
        // falls nicht planar, dann nicht |E| <= 3|V| - 6
        // let nichtPlanar = E <= 3*V - 6; // only useful if false 


        // immer planar, k3,3 und k5 nie minor 
        let kuratowski = checkKuratowski(gradArr);
        
        let farbbar;

        if (kuratowski.planar) {
            farbbar = "Jede planare und einfache Graph ist 4 Farbbar";  // vier farbe satz 
        } else {
            const anzahl = Math.floor(0.5 + Math.sqrt(2*E + 0.25)); // die formel 
            farbbar = "Graph ist " + anzahl + " Färbbar"
        }

        let nichtBaum = hatKreis || (!hasLeafs(gradArr)) || !(E === V -1); // useful if true 

        const eig = []

        if (zusammenhangend) {
            eig.push("Diese Graph ist immer zusammenhängend")
        } else {
          eig.push("Graph kann auch nicht zusammenhängend sein")
        }

        if (hatKreis) {
          eig.push("Graph enthalt ein Kreis")
        }

        if (hatEulertour) {
          eig.push( "Graph enthalt ein Eulertour")
        }

        if (hatHamiltonkreis) {
          eig.push("Graph enthalt ein Hamiltonkreis")
         
        }

        eig.push(kuratowski.reason)

        if (nichtBaum) {
            eig.push("Es gibt keinen Baum mit diesen Gradfolge")
        } 

        eig.push(farbbar)
        setEigenschaften(eig)
    }

    function hasLeafs(gradArr) {
        for (let i = 0; i < gradArr.length; i++) {
            if (gradArr[i] == 1) {
                return true; 
            } 
        }
        return false; 
    }

    function checkEulertour(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0) {
          return false; // If any element is odd, return false
        }
      }
      return true; // If all elements are even, return true
    }

    function checkHamilton(arr) {
        let grad = arr.length / 2;
        for (let i = 0; i < arr.length; i++) {
            // check for commas 
            if (arr[i] < grad) {
                return false; 
            }
        }
        return true; 
    }

    function checkKuratowski(gradArr) {
        // falls es 6 knoten gibt mit grad mind 3
        // falls es 5 knoten gibt mit grad mind 4 
        
        if (gradArr.length > 4) {
            // check k5
            let greaterThanFour = gradArr.slice().filter(function (num) {
              return num >= 4;
            });

            console.log(greaterThanFour)
            
            if (greaterThanFour.length >= 5) {
                return {planar: false, reason : "Nicht immer planar, K5 kann Minor sein"}; 
            } 


            if (gradArr.length > 5) {
                // check k3,3
                let greaterThanThree = gradArr.slice().filter(function (num) {
                  return num >= 3;
                });
                if (greaterThanThree.length >= 6) {
                    return {planar: false, reason : "Nicht immer planar, K3,3 kann Minor sein"}; 
                } 
            }
        }
        return {planar: true, reason : "Planar, weder K3,3 noch K5 Minor"}; 

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

                {represantable && (<>
                  <Col xs={24} className="mb-3">
                      <Title level={5}>Eigenschaften: </Title>
                      <ul className='eigenschaften'>
                          {eigenschaften.map(e => {
                            return (
                              <li>{e}</li>
                            )
                          })}
                          
                      </ul>
                  </Col>
                
                </>)}

                {(result !== []) && (
                      <>
                        <Col xs={24}><Title level={5}>Havel Hakimi</Title></Col>
                        {result.map((r, i) => {
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
                        })}
                      </>
                )}
            
          </Row>
        )}


      </>
    )
}






export default HavelHakimi