import React, { useState, useRef } from "react";
import { Col, Row, Input, Button, Switch, Space, Typography, Popover } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import './styles.css' 
import { Graphs }  from "./Graphs";




const { Title, Text }  = Typography


const defaultNodes = [
    {
      title: "1",
      type: "circle",
      x: -200,
      y: 200
    },
    {
      title: "2",
      type: "circle",
      x: 0,
      y: 300
    },
    {
      title: "3",
      type: "circle",
      x: 0,
      y: 100
    },
    {
      title: "4",
      type: "circle",
      x: 200,
      y: 200
    }
]

const defaultEdges = [
    { source: "1", target: "2", type: "emptyEdge" },
    { source: "2", target: "4", type: "emptyEdge" },
    { source: "1", target: "3", type: "emptyEdge" },
    { source: "3", target: "4", type: "emptyEdge" }
  ]




export default function RelationalesProdukt() {
    const childRefR = useRef(null);
    const childRefS = useRef(null);

    const [graphR, setGraphR] = useState({nodes: defaultNodes, edges: defaultEdges, selected: {}})
    const [graphS, setGraphS] = useState({nodes: defaultNodes, edges: defaultEdges, selected: {}})

    const [result, setResult] = useState({nodes: [], edges:[], selected: {}})
    const [calculated, setCalculated] = useState(false)



    const [expression, setExpression] = useState("")

    const [resName, setResName] = useState("")


    const [symmetrisch, setSymmetrisch] = useState(false)

    // for result 
    const [eigenschaften, setEigenschaften] = useState([])



    function evaluate(exp) {
        const tokens = exp.split("");
        
        const initialGraphToken = tokens.shift();
        let g;

        switch (initialGraphToken) {
        case "S":
            g = graphS;
            break;
        case "R":
            g = graphR;
            break;
        default:
            throw new Error("Invalid input string");
        }

        const res = evaluateSubexpression(tokens);
        calculateMatrix(res);
        
        setResult(res)
        setResName(exp)

        function evaluateSubexpression(tokens) {
            let result = g; // Initialize to the empty graph
            
            while (tokens.length > 0) {
              const token = tokens.shift(); // Remove the first token from the array
              
              if (token === "(") {
                // Evaluate the subexpression recursively
                const subexpression = evaluateSubexpression(tokens);
              
                result = step(result, subexpression);
              } else if (token === ")") {
                break; // Exit the loop and return the result
              } else if (/[A-Z,+,*]+/.test(token)) {
                // Split the token into individual letters and process each one
                for (let i = 0; i < token.length; i++) {
                  const letter = token[i];
                  // Perform the corresponding operation based on the letter
                  switch (letter) {
                    case "S":
                      result = step(result, graphS);
                      break;
                    case "R":
                      result = step(result, graphR);
                      break;
                    case "+":
                      result = reflexive(result);
                      break;
                    case "*":
                      result = star(result);
                      break;
                    case "I":
                      let exi = tokens.shift(); 
                      let targeti = null; 


                      if (exi === "(") {
                          const temp = tokens.shift()
                          if (temp === "R") {
                            g = graphR;
                          } else {
                            g = graphS
                          }
                          targeti = evaluateSubexpression(tokens)
                      } else if (exi === "R") {
                        targeti = graphR
                      } else if (exi === "S") {
                        targeti = graphS
                      } 
                      if (targeti !== null) {
                        result = intersect(result, targeti)
                      }

                      break 
                    case "U":
                      let exu = tokens.shift(); 
                      let targetu = null; 

                      if (exu === "(") {
                          const temp = tokens.shift()
                          if (temp === "R") {
                            g = graphR;
                          } else {
                            g = graphS
                          }
                          targetu = evaluateSubexpression(tokens)
                      } else if (exu === "R") {
                        targetu = graphR
                      } else if (exu === "S") {
                        targetu = graphS
                      } 
                      if (targetu !== null) {
                        result = union(result, targetu)
                      }
                      break; 
                    default:
                      throw new Error("Invalid input string");
                  }
                }
              } else if (token === "*") {
                // Apply the star operation to the previous graph
                result = star(result);
              } else if (token === "-") {
                result = reverse(result);  

              }
            }
          
            return result;
        }
    }

    function calculateMatrix(g) {
        const mat = Array.from({length: g.nodes.length}, () => new Array(g.nodes.length).fill(false));

        const nodeIndex = {};
        g.nodes.forEach((node, i) => nodeIndex[node.title] = i);

        // Update the matrix based on the edges
        for (let j = 0; j < g.edges.length; j++) {
            const sourceI = nodeIndex[g.edges[j].source];
            const targetI = nodeIndex[g.edges[j].target];
            mat[sourceI][targetI] = true;
        }


        // finding the eigenschaften 
        // reflexivitat 
        let reflexive = true;
        let irreflexive = true; 
        let symmetrisch = true; 
        let antisymmetrisch = true; 
        let transitive = true; 

        // check reflexive and irreflexive
        for (let i = 0; i < mat.length; i++) {
            if (!mat[i][i]) {
              reflexive = false;
            }
            if (mat[i][i]) {
              irreflexive = false;
            }
            if (!reflexive && !irreflexive) {
              break; 
            }
        }

        // check symmetrisch antisymmetrisch
        for (let i = 0; i < mat.length; i++) {
            for (let j = 0; j < mat.length; j++) {
                if (!(mat[i][j] === mat[j][i])) {
                  symmetrisch = false;
                }
                if (mat[i][j] && mat[j][i]) {
                  antisymmetrisch = false;
                }

                if (mat[i][j]) {
                  for (let k = 0; k < mat.length; k++) {
                    if (mat[j][k] && !mat[i][k]) {
                      transitive = false;
                    }
                  }
                }
            }
        }


        const eig = []

        if (reflexive) {
          eig.push("Relation ist reflexiv")
        }
        if (irreflexive) {
          eig.push("Relation ist irreflexiv")
        }
        if (symmetrisch) {
          eig.push("Relation ist symmetrisch")
        }
        if (antisymmetrisch) {
          eig.push("Relation ist antisymmetrisch")
        }
        if (antisymmetrisch && irreflexive) {
          eig.push("Relation ist asymmetrisch")
        }
        if (transitive) {
          eig.push("Relation ist transitiv")
        }


        if (reflexive && symmetrisch && transitive) {
          eig.push("Aquivalenzrelation")
        }
        if (reflexive && antisymmetrisch && transitive) {
          eig.push("Partielle Ordnung")
        }

        setEigenschaften(eig)
      }
    
    

    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Row gutter={[8,8]} className="mb-3">
                  <Col  lg={4} md={12} xs={24}>
                      <Button style={{"width" : "100%"}}  onClick={() => { 
                          childRefR.current.makeReflexive();
                          childRefS.current.makeReflexive();
                      }}>Reflexiv machen</Button>
                  </Col>
                  <Col lg={7} md={12} sm={20} xs={22}>
                    <Space>
                          <Switch checkedChildren="Symmetrisch" checked={symmetrisch} onChange={() => { setSymmetrisch(!symmetrisch) }} unCheckedChildren="Nicht Symmetrisch" defaultChecked={symmetrisch} />
                          <a>
                              <Popover  style={{"maxWidth" : "100%"}}  placement="bottom" title={"Legende"} content={<>

                                    <Row style={{"width" : "450px"}}>
                                      <Col xs={12}><Text strong>Knoten/Kanten entfernen:</Text></Col>
                                      <Col xs={12}>Knote/Kante anklicken und delete auf die Tastatur drücken</Col>
                                      <Col xs={12}><Text strong>Knoten verbinden:</Text></Col>
                                      <Col xs={12}>Shift gedrückt halten und malen</Col>
                                      <Col xs={12}><Text strong>Reflexiv:</Text></Col>
                                      <Col xs={12}>macht den Knoten reflexiv</Col>
                                      <Col xs={12}><Text strong>Symmetrisch:</Text></Col>
                                      <Col xs={12}>wenn aktiviert werden neue Kanten symmetrisch</Col>
                                    </Row>
                              </>} trigger="click">
                                {"  "}<QuestionCircleOutlined  style={{"fontSize" : "14px"}}  />
                              </Popover>  
                        </a>
                    </Space>
                  </Col> 
                  <Col md={1} xs={2}>
                  
                  </Col>

                
              </Row>
                
            </Col>
            <Col md={12} sm={24} xs={24} className="mb-2">
                <Graphs ref={childRefR} name={"R"} symmetrisch={symmetrisch} result={false} graph={graphR} setGraph={setGraphR}/>
            </Col>
            <Col md={12} sm={24} xs={24}>
                <Graphs ref={childRefS} name={"S"} symmetrisch={symmetrisch} result={false} graph={graphS} setGraph={setGraphS}/>
            </Col>
        </Row>
    
        <Row className="mb-3 mt-4" gutter={[16, 16]}>
                    <Col xl={20} lg={20} md={18} sm={24} xs={24}>
                        <Input 
                            name='node'
                            placeholder={`RR*(S+)`}
                            value={expression}
                            
                            onChange={(e) => { setExpression(e.target.value) }}
                            
                            suffix={
                            <a>
                              <Popover  style={{"maxWidth" : "100%"}}  placement="bottom" title={"Legende"} content={<>

                                    <Row style={{"width" : "250px"}}>
                                      <Col style={{"textAlign" : "center"}} xs={4}><Text strong>{"*"}</Text></Col>
                                      <Col xs={18}>Reflexive Transitive Hülle</Col>

                                      <Col style={{"textAlign" : "center"}} xs={4}><Text strong>{"+"}</Text></Col>
                                      <Col xs={18}>Transitive Hülle</Col>

                                      <Col style={{"textAlign" : "center"}} xs={4}><Text strong>{"-"}</Text></Col>
                                      <Col xs={18}>^-1</Col>
                                      <Col style={{"textAlign" : "center"}} xs={4}><Text  strong>U</Text></Col>
                                      <Col xs={18}>Vereinigung {"(union)"}</Col>
                                      <Col style={{"textAlign" : "center"}} xs={4}><Text strong>I</Text></Col>
                                      <Col xs={18}>Schnitt {"intersection"}</Col>
                                    
                                    </Row>
                              </>} trigger="click">
                                {"  "}<QuestionCircleOutlined  style={{"fontSize" : "14px"}}  />
                              </Popover>  
                          </a>}
                            
                            />
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={24} xs={24}>
                        <Button disabled={expression===""} style={{"width":"100%"}} onClick={() => {
                            
                            evaluate(expression)
                            setCalculated(true)
                      

                            }}>Berechnen</Button>
                    </Col>

           
        </Row>
       

        {calculated && (
            <Row>
                <Col sm={24}>
                    <Graphs name={resName} result={true} graph={result} setGraph={setResult}/>
                </Col>
                {eigenschaften.length > 0 && (<>
                  <Col xs={24} className="mt-3">
                      <Title level={5}>Eigenschaften von {resName}: </Title>
                      <ul className='eigenschaften'>
                          {eigenschaften.map(e => {
                            return (
                              <li>{e}</li>
                            )
                          })}
                          
                      </ul>
                  </Col>
                </>)}
            </Row>
        )}
        
        </>
    )
  
}


// takes 2 graphs, returs g1*g2 
function step(g1, g2) {
    

    // const nodes = [...new Map(g2.nodes.concat(g1.nodes).map(item =>
    //     [item["title"], item])).values()];
    
    const edges = []
    const nodes = []

    const uniques = [...new Set(g1.nodes.concat(g2.nodes).map(item => item.title))];
    let radius = 150 + ((uniques.length/8) * 100);  // either 200 or 400 
    

    for (let i = 0; i < uniques.length; i++) {
        let angle = i * (2 * Math.PI / uniques.length);
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
     
        nodes.push({
            title: uniques[i],
            type: "circle",
            x: x,
            y: y, 
        })
    }

    

    for (let i = 0; i < g1.edges.length; i++) {
        let src1 = g1.edges[i].source 
        let trg1 = g1.edges[i].target 

        // "emptyEdge" 

        for (let j = 0; j < g2.edges.length; j++) {
            let src2 = g2.edges[j].source 
            let trg2 = g2.edges[j].target

            if (trg1 == src2) {
                edges.push({
                    source : src1,
                    target : trg2,
                    type : "emptyEdge"
                })
            }
        }
    }

    return {nodes, edges, selected : {}}
}


function reflexive(g1) {
    // adding reflexive edges 
    const uniques = [...new Set(g1.nodes.map(item => item.title))];

    const edges = [...g1.edges]
    
    for (let i = 0; i < uniques.length; i++) {
        edges.push({
            source : uniques[i],
            target : uniques[i],
            type : "emptyEdge" // TODO change this to reflexive edge
        })
    }

    return {nodes : g1.nodes, edges, selected : {}}
}



function star(g1) {
    let reflexiv = reflexive(g1);
    let rt = reflexiv;

    // laut vorlesung: R* = R<=n-1 
    for (let i = 0; i < g1.nodes.length; i++) {
        rt = step(rt, reflexiv)
    }
    return rt; 
}



function reverse(g1) {

    const edges = []

    for (let i = 0; i < g1.edges.length; i++) {
      edges.push({
        source : g1.edges[i].target,
        target : g1.edges[i].source,
        type: "emptyEdge"
      })
    }

    return {nodes : g1.nodes, edges, selected: {}}
}


function union(g1, g2) {

  const nodes = []
  const uniques = [...new Set(g1.nodes.concat(g2.nodes).map(item => item.title))];
  let radius = 150 + ((uniques.length/8) * 100);  // either 200 or 400 
  

  for (let i = 0; i < uniques.length; i++) {
      let angle = i * (2 * Math.PI / uniques.length);
      let x = radius * Math.cos(angle);
      let y = radius * Math.sin(angle);
    
      nodes.push({
          title: uniques[i],
          type: "circle",
          x: x,
          y: y, 
      })
  }

  let edges = g1.edges.concat(g2.edges).reduce((acc, obj) => {
    const exists = acc.some(item => item.source === obj.source && item.target === obj.target);
    if (!exists) {
      acc.push(obj);
    }
    return acc;
  }, []);

  return {nodes, edges, selected: {}}
}


function intersect(g1, g2) {

  let edges = g1.edges.filter(obj1 =>
    g2.edges.some(obj2 => obj2.source === obj1.source && obj1.target === obj2.target)
  )
  let nodes = g1.nodes.filter(obj1 =>
    g2.nodes.some(obj2 => obj2.title === obj1.title)
  )
  return {
    nodes,
    edges,
    selected : {}
  }
}


