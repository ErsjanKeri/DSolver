import React from 'react'
import GraphView from 'react-digraph';




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


function HavelGraph(props) {
    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;


    return (
        <>
              <GraphView
                    allowMultiselect={false}
                    nodeKey={"title"}
                    nodes={props?.nodes}
                    edges={props?.edges} 
                    zoomDur={200}
                    edgeArrowSize={1}
                    nodeTypes={NodeTypes}
                    nodeSubtypes={NodeSubtypes}
                    edgeTypes={EdgeTypes}

                />
        </>
    )
}

export default HavelGraph