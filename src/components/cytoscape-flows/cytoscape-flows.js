import React from "react";

import CytoscapeComponent from "react-cytoscapejs";

const CytoscapeFlows = ({ nodes, edges }) => {
  const elements = [
    { data: { id: "one", label: "Node 1" } },
    { data: { id: "two", label: "Node 2" } },
    {
      data: { source: "one", target: "two", label: "Edge from Node1 to Node2" }
    }
  ];
  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: "100%", height: "80vh", border: "1px solid #16001E" }}
    />
  );
};

export default CytoscapeFlows;
