import React from "react";

import ReactFlow, { Background } from "reactflow";

import "reactflow/dist/style.css";
import "./react-flows.css";

const initialNodes = [
  { id: "1", position: { x: 700, y: 100 }, data: { label: "1" } },
  { id: "2", position: { x: 750, y: 200 }, data: { label: "2" } }
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function ReactFlows({ nodes = { initialNodes }, edges = { initialEdges } }) {
  return (
    <div className="flowsContainer">
      <div style={{ height: 700, width: 1500, textAlign: "center" }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background color="#99b3ec" />
        </ReactFlow>
      </div>
    </div>
  );
}

export default ReactFlows;
