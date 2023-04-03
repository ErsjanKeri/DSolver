import React, { useState, useImperativeHandle, forwardRef } from "react";
import { GraphView } from "react-digraph";
import { Col, Row, Input, Button, Typography } from "antd"

import './styles.css' 
import { useTranslation } from "react-i18next";


const EMPTY_EDGE_TYPE = "emptyEdge";

const GraphConfig = {
  NodeTypes: {
    circle: {
      // required to show empty nodes
      typeText: "#",
      shapeId: "#circle", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="circle" key="0">
          <circle cx="50" cy="50" r="20" />
        </symbol>
      )
    },
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {
      // required to show empty edges
      shapeId: "#emptyEdge",
      // edge type could be "wait" or "delay" and
      // the target node's wait time could be displayed in the edge (in the arrow)
      shape: <span id="emptyEdge" />,
    }
    
  }
};


const { Title, Text } = Typography

const Graphs = forwardRef((props, ref) => {
    // i18n
    const { t } = useTranslation()

    useImperativeHandle(ref, () => ({
        makeReflexive,
    }));
   
    const [nodeId, setNodeId] = useState("")


    const [selected, setSelected] = useState({})

 
    const onCreateNode = (x, y) => {
        const node = {
            title: nodeId, // should be input from user
            x,
            y,
            type: "circle",
        };

        props.setGraph({
            ...props.graph,
            nodes : [...props.graph.nodes, node]
        })
        setNodeId("")

        return props.graph
    };
    

    const onDeleteNode = (node) => {
        // Delete any connected edges
        props.setGraph({
            ...props.graph,
            nodes : props.graph.nodes.filter(item => (item.title != node.title)),
            edges : props.graph.edges.filter((edge) => !(edge.source === node.title || edge.target === node.title))

        })
    };


    const onCreateEdge = (sourceViewNode, targetViewNode) => {
        const type = EMPTY_EDGE_TYPE;

        const viewEdge = [{
            source: sourceViewNode.title,
            target: targetViewNode.title,
            type
        }];
        
        if (props.symmetrisch) {
            viewEdge.push({
                source: targetViewNode.title,
                target: sourceViewNode.title,
                type
            })
        }
        // Only add the edge when the source node is not the same as the target
        props.setGraph({
            ...props.graph,
            edges: [...props.graph.edges, ...viewEdge]
        })

    };
  
    const onDeleteEdge = (edge) => {
        props.setGraph({
            ...props.graph,
            edges : props.graph.edges.filter(item => (!((item.source == edge.source) && (item.target == edge.target)))) 
        })
    };


    function makeReflexive() {
       
        if (selected?.nodes !== null && selected?.nodes !== undefined) {
            props.setGraph({
                ...props.graph,
                edges : [...props.graph.edges, {
                  source: selected.nodes.values().next().value.title,
                  target: selected.nodes.values().next().value.title,
                  type : "emptyEdge",
              }]
            })
        }
    }
    


    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;



    return (
        <>
        <Row >
            <Col sm={24} className="mb-2">
                <Row gutter={[16, 16]}>
                    {props.result ? (
                        <>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Title style={{"marginBottom": 0, "paddingBottom" : 0, "textAlign" : "left"}} level={3}>{props.name}</Title>
                        </Col>
                        </>
                    ) : (
                        <>
                    <Col xl={2} lg={2} md={2} sm={3} xs={3}>
                        <Title style={{"textAlign" : "left", "marginBottom": 0, "paddingBottom" : 0}} level={3}>{props.name}</Title>
                    </Col>
                    <Col xl={14} lg={14} md={14} sm={21} xs={21}>
                        <Input 
                            name='node'
                            placeholder={t("placeholder-vertex-id")}
                            value={nodeId}
                            
                            onChange={(e) => { setNodeId(e.target.value) }}
                            />
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                        <Button type="primary"
                                ghost
                                disabled={nodeId === ""}
                                style={{width: "100%"}}
                                onClick={() => onCreateNode(100, 100) }
                                >
                                {t("add-vertex")}
                        </Button>
                    </Col>

                        </>
                    )}
                    
                </Row>
            </Col>
            <Col sm={24}>
                <div id="graph">
                    {props.result ? (<>
                        <GraphView
                        //ref="GraphView"
                        allowMultiselect={false}
                        nodeKey={"title"}
                        nodes={props.graph.nodes}
                        edges={props.graph.edges}
                        nodeTypes={NodeTypes}
                        nodeSubtypes={NodeSubtypes}
                        edgeTypes={EdgeTypes}
                    />
                    
                    </>) : (<>
                    
                    
                        <GraphView
                         
                            //ref="GraphView"
                            allowMultiselect={false}
                            onSelect={setSelected}
                            nodeKey={"title"}
                            nodes={props.graph.nodes}
                            edges={props.graph.edges}
                            selected={selected}
                            nodeTypes={NodeTypes}
                            nodeSubtypes={NodeSubtypes}
                            edgeTypes={EdgeTypes}
                            onCreateNode={onCreateNode}
                            onCreateEdge={onCreateEdge}
                            zoomDur={200}
                            onDeleteSelected={(obj) => { 
                                if (obj.nodes !== null) {
                                    onDeleteNode(obj.nodes.values().next().value)
                                } else {
                                    onDeleteEdge(obj.edges.values().next().value)
                                }
                            }}
                    />
                    
                    </>)}
                    
                </div>
            </Col>
        </Row>
    

        </>
    )
  
}
)

export { Graphs };