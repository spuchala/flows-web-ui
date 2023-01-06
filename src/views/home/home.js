import React, { useState } from "react";

import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
import "reactflow/dist/style.css";

import IconBar from "../../components/icon-bar/icon-bar";
import {
  flowLayOutsConfig,
  flowLayoutTypes
} from "../../config/flow-layout-config";
import { getNodesAndEdgesFromExcel } from "../../utils/excel-utils";
import {
  getLayoutedElements,
  getMermaidGraphFromEdges,
  getMermaidSequenceDiagremFromEdges
} from "../../utils/flows-utils";
import ReactFlows from "../../components/react-flows/react-flows";
import "./home.css";
import MermaidFlows from "../../components/mermaid-flows/mermaid-flows";

const Home = () => {
  const [nodes, setNodes] = useState(null);
  const [edges, setEdges] = useState(null);
  const [mermaidContent, setMermaidContent] = useState(null);
  const [flowLayoutChanged, setFlowLayoutChanged] = useState(false);
  const useReactFlows = false;

  const handleFileUpload = (e) => {
    e.preventDefault();

    const files = e.target.files,
      file = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      const fileData = e.target.result;
      const fileReadData = XLSX.read(fileData, { type: "binary" });

      const { nodes: initialNodes, edges: initialEdges } =
        getNodesAndEdgesFromExcel(fileReadData);
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(initialNodes, initialEdges);
      const mermaidContent = getMermaidGraphFromEdges(initialEdges);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setMermaidContent(mermaidContent);
    };
    reader.readAsBinaryString(file);
  };

  const handleLayoutChange = (layoutType) => {
    setFlowLayoutChanged(true);
    if (useReactFlows) {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, layoutType);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    } else {
      if (layoutType === flowLayoutTypes.FLOW) {
        setMermaidContent(getMermaidGraphFromEdges(edges));
      } else if (layoutType === flowLayoutTypes.SEQUENCE_FLOW) {
        setMermaidContent(getMermaidSequenceDiagremFromEdges(edges));
      }
    }
  };

  return (
    <div className="container">
      <Button variant="contained" color="secondary" component="label">
        Upload Excel
        <input type="file" onChange={handleFileUpload} hidden />
      </Button>
      {nodes && edges && (
        <div className="flowsContainer">
          <IconBar
            config={flowLayOutsConfig}
            callback={(layoutType) => handleLayoutChange(layoutType)}
          />
          <div className="flowsRenderContainer">
            {useReactFlows && nodes && edges && (
              <ReactFlows nodes={nodes} edges={edges} />
            )}
            {!useReactFlows && mermaidContent && (
              <MermaidFlows
                flowLayoutChanged={flowLayoutChanged}
                content={mermaidContent}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
