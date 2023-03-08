import React, { useState, useRef } from "react";
import { GraphView } from "react-digraph";
import { Col, Row, Input, Button, Switch, Space, Typography } from "antd"

import './styles.css' 
import { Graphs }  from "./Graphs";

const { Title }  = Typography

const EMPTY_EDGE_TYPE = "emptyEdge";


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
                  console.log(letter)
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
        console.log(mat)

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
                      console.log("i " + i + " j " + j + " k " + k)
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
              <Space wrap>
                  <Button onClick={() => { 
                      childRefR.current.makeReflexive();
                      childRefS.current.makeReflexive();
                   }}>Make Reflexive</Button>
                  <Switch checkedChildren="Symmetrisch" value={symmetrisch} onChange={() => { setSymmetrisch(!symmetrisch) }} unCheckedChildren="Not Symmetrisch" defaultChecked={symmetrisch} />
              </Space>
            </Col>
            <Col sm={12} className="mb-2">
                <Graphs ref={childRefR} name={"R"} symmetrisch={symmetrisch} result={false} graph={graphR} setGraph={setGraphR}/>
            </Col>
            <Col sm={12}>
                <Graphs ref={childRefS} name={"S"} symmetrisch={symmetrisch} result={false} graph={graphS} setGraph={setGraphS}/>
            </Col>
        </Row>
    
        <Row className="mb-3" gutter={[16, 0]}>
                    <Col xl={20} lg={20} md={20} sm={20} xs={20}>
                        <Input 
                            name='node'
                            placeholder={`RR*(S+)`}
                            value={expression}
                            
                            onChange={(e) => { setExpression(e.target.value) }}
                            />
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                        <Button disabled={expression===""} style={{"width":"100%"}} onClick={() => {
                            
                            evaluate(expression)
                            setCalculated(true)
                      

                            }}>Calculate</Button>
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
