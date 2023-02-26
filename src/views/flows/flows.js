import React, { useState } from "react";

import { Button, Stack } from "@mui/material";
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
  getMermaidSequenceDiagremFromFlowData,
  getFlowsSummary
} from "../../utils/flows-utils";
import ReactFlows from "../../components/react-flows/react-flows";
import "./flows.css";
import MermaidFlows from "../../components/mermaid-flows/mermaid-flows";
import DropDown from "../../components/drop-down/drop-down";
import { edgeInfoConfig, edgeInfoTypes } from "../../config/edge-info-config";
import FlowSummary from "../../components/flow-summary/flow-summary";

const Flows = () => {
  const [flowData, setFlowData] = useState(null);
  const [mermaidContent, setMermaidContent] = useState(null);
  const [reRenderFlows, setReRenderFlows] = useState(false);
  const [flowType, setFlowType] = useState(flowLayoutTypes.FLOW);
  const [edgeType, setEdgeType] = useState(edgeInfoTypes.EDGES_BY_DESCRIPTION);
  const [openSummary, setOpenSummary] = useState(false);
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
      const mermaidContent = getMermaidGraphFromFlowData(flowData, edgeType);

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
    setFlowType(layoutType);
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
        setMermaidContent(getMermaidGraphFromFlowData(flowData, edgeType));
      } else if (layoutType === flowLayoutTypes.SEQUENCE_FLOW) {
        setMermaidContent(
          getMermaidSequenceDiagremFromFlowData(flowData, edgeType)
        );
      }
    }
    setReRenderFlows(true);
  };

  const handleEdgeInfoChange = (changedValue) => {
    setEdgeType(changedValue);
    if (flowType === flowLayoutTypes.FLOW) {
      setMermaidContent(getMermaidGraphFromFlowData(flowData, changedValue));
    } else if (flowType === flowLayoutTypes.SEQUENCE_FLOW) {
      setMermaidContent(
        getMermaidSequenceDiagremFromFlowData(flowData, changedValue)
      );
    }
    setReRenderFlows(true);
  };

  const handleShowFlowInFullScreen = () => {};

  const handleViewSummary = () => {
    setOpenSummary(true);
  };

  const handleCloseSummary = () => {
    setOpenSummary(false);
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
          <Stack
            direction={"row"}
            spacing={2}
            className="otherOptionsContainer"
          >
            <DropDown
              title="Render diagram by edge type"
              items={edgeInfoConfig}
              selectedItem={edgeInfoConfig[0].value}
              onChange={handleEdgeInfoChange}
            />
            <Button
              variant="contained"
              color="secondary"
              component="label"
              onClick={handleShowFlowInFullScreen}
            >
              Full Screen
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component="label"
              onClick={handleViewSummary}
            >
              View Summary
            </Button>
          </Stack>
          <div className="flowsRenderContainer">
            {useReactFlows && flowData && (
              <ReactFlows nodes={flowData.nodes} edges={flowData.edges} />
            )}
            {!useReactFlows && mermaidContent && (
              <MermaidFlows
                reRenderFlows={reRenderFlows}
                content={mermaidContent}
              />
            )}
          </div>
        </div>
      )}
      {flowData && (
        <FlowSummary
          open={openSummary}
          summary={getFlowsSummary(flowData)}
          onCloseSummary={handleCloseSummary}
        />
      )}
    </div>
  );
};

export default Flows;
