import React, { useState } from "react";

import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
import "reactflow/dist/style.css";

import IconBar from "../../components/icon-bar/icon-bar";
import {
  flowLayOutsConfig,
  flowLayoutTypes
} from "../../config/flow-layout-config";
import { getNodesEdgesAndGroupsFromExcel } from "../../utils/excel-utils";
import {
  getLayoutedElements,
  getMermaidGraphFromFlowData,
  getMermaidSequenceDiagremFromFlowData
} from "../../utils/flows-utils";
import ReactFlows from "../../components/react-flows/react-flows";
import "./flows.css";
import MermaidFlows from "../../components/mermaid-flows/mermaid-flows";

const Flows = () => {
  const [flowData, setFlowData] = useState(null);
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

      const flowData = getNodesEdgesAndGroupsFromExcel(fileReadData);
      const { layoutedNodes, layoutedEdges } = getLayoutedElements(flowData);
      const mermaidContent = getMermaidGraphFromFlowData(flowData);

      setFlowData({
        nodes: layoutedNodes,
        edges: layoutedEdges,
        groups: flowData.groups
      });
      setMermaidContent(mermaidContent);
    };
    reader.readAsBinaryString(file);
  };

  const handleLayoutChange = (layoutType) => {
    setFlowLayoutChanged(true);
    if (useReactFlows) {
      const { nodes, edges } = flowData;
      const { layoutedNodes, layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        layoutType
      );
      setFlowData({ nodes: [...layoutedNodes], edges: [...layoutedEdges] });
    } else {
      if (layoutType === flowLayoutTypes.FLOW) {
        setMermaidContent(getMermaidGraphFromFlowData(flowData));
      } else if (layoutType === flowLayoutTypes.SEQUENCE_FLOW) {
        debugger;
        setMermaidContent(getMermaidSequenceDiagremFromFlowData(flowData));
      }
    }
  };

  return (
    <div className="container">
      <Button variant="contained" color="secondary" component="label">
        Upload Excel
        <input type="file" onChange={handleFileUpload} hidden />
      </Button>
      {flowData && (
        <div className="flowsContainer">
          <IconBar
            config={flowLayOutsConfig}
            callback={(layoutType) => handleLayoutChange(layoutType)}
          />
          <div className="flowsRenderContainer">
            {useReactFlows && flowData && (
              <ReactFlows nodes={flowData.nodes} edges={flowData.edges} />
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

export default Flows;
