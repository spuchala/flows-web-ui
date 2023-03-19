import React from "react";

import ReactFlow, { Background, useNodesState, useEdgesState } from "reactflow";

import "reactflow/dist/style.css";
import "./react-flows.css";

const initialNodes = [
  {
    id: "Project Manager",
    position: { x: 700, y: 100 },
    data: { label: "Project Manager" }
  },
  {
    id: "Resource Manager",
    position: { x: 750, y: 200 },
    data: { label: "Resource Manager" }
  }
];

const initialEdges = [
  {
    id: "e1-2",
    source: "Project Manager",
    target: "Resource Manager",
    type: "smoothstep"
  }
];

function ReactFlows({ nodes = { initialNodes }, edges = { initialEdges } }) {
  const [nodesState, , onNodesChange] = useNodesState(nodes);
  const [edgesState, , onEdgesChange] = useEdgesState(edges);

  return (
    <div className="flowsContainer">
      <div
        style={{ width: "100%", height: "80vh", border: "1px solid #16001E" }}
      >
        <ReactFlow
          nodes={nodesState}
          edges={edgesState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          snapToGrid
        >
          <Background color="#99b3ec" />
        </ReactFlow>
      </div>
    </div>
  );
}

export default ReactFlows;
