import React, { useState } from "react";

import { Button, Stack } from "@mui/material";
import * as XLSX from "xlsx";
import "reactflow/dist/style.css";

import ChipBar from "../../components/chip-bar/chip-bar";
import {
  flowLayOutsConfig,
  flowLayoutTypes
} from "../../config/flow-layout-config";
import { getNodesEdgesAndGroupsFromExcel } from "../../utils/excel-utils";
import {
  getLayoutedElements,
  getMermaidGraphFromFlowData,
  getMermaidSequenceDiagramFromFlowData,
  getFlowsSummary
} from "../../utils/flows-utils";
import ReactFlows from "../../components/react-flows/react-flows";
import "./flows.css";
import MermaidFlows from "../../components/mermaid-flows/mermaid-flows";
import DropDown from "../../components/drop-down/drop-down";
import { edgeInfoConfig, edgeInfoTypes } from "../../config/edge-info-config";
import FlowSummary from "../../components/flow-summary/flow-summary";
import {
  graphLibraryConfig,
  graphLibraryTypes
} from "../../config/graph-library-config";

import { useNavigate } from "react-router-dom";
import RadioButtonGroup from "../../components/radio-button-group/radio-button-group";
import CytoscapeFlows from "../../components/cytoscape-flows/cytoscape-flows";
import EditFlow from "../../components/edit-flow/edit-flow";

const Flows = () => {
  const [flowData, setFlowData] = useState(null);
  const [mermaidContent, setMermaidContent] = useState(null);
  const [reRenderFlows, setReRenderFlows] = useState(false);
  const [flowType, setFlowType] = useState(flowLayoutTypes.FLOW);
  const [edgeType, setEdgeType] = useState(edgeInfoTypes.EDGES_BY_DESCRIPTION);
  const [openSummary, setOpenSummary] = useState(false);
  const [openEditFlow, setOpenEditFlow] = useState(false);
  const [activeGraphLibrary, setActiveGraphLibrary] = useState(
    graphLibraryConfig.find((g) => g.isDefault).key
  );

  const navigate = useNavigate();

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

    if (
      activeGraphLibrary === graphLibraryTypes.REACT_FLOWS ||
      activeGraphLibrary === graphLibraryTypes.CYTOSCAPE
    ) {
      const { layoutedNodes, layoutedEdges } = getLayoutedElements(
        flowData,
        layoutType
      );
      setFlowData({ nodes: [...layoutedNodes], edges: [...layoutedEdges] });
    } else if (activeGraphLibrary === graphLibraryTypes.MERMAID) {
      if (
        layoutType === flowLayoutTypes.GRAPH_LEFT_TO_RIGHT ||
        layoutType === flowLayoutTypes.GRAPH_TOP_TO_BOTTOM
      ) {
        setMermaidContent(
          getMermaidGraphFromFlowData(flowData, edgeType, layoutType)
        );
      } else if (layoutType === flowLayoutTypes.SEQUENCE_FLOW) {
        setMermaidContent(
          getMermaidSequenceDiagramFromFlowData(flowData, edgeType)
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
        getMermaidSequenceDiagramFromFlowData(flowData, changedValue)
      );
    }
    setReRenderFlows(true);
  };

  const handleFlowsFromSurveys = () => {
    navigate("/surveys");
  };

  const handleGraphLibraryChange = (library) => {
    setActiveGraphLibrary(library);
    setReRenderFlows(false);
  };

  const handleEditFlow = (editedFlowData) => {
    debugger;
    setFlowData(editedFlowData);
    setMermaidContent(
      getMermaidGraphFromFlowData(editedFlowData, edgeType, flowType)
    );
    setReRenderFlows(true);
  };

  return (
    <div className="container">
      <Button
        variant="contained"
        color="secondary"
        component="label"
        onClick={handleFlowsFromSurveys}
      >
        Flow from surveys
      </Button>
      &nbsp; &nbsp;
      <Button variant="contained" color="secondary" component="label">
        Upload Excel
        <input type="file" onChange={handleFileUpload} hidden />
      </Button>
      {flowData && (
        <div className="flowsContainer">
          <Stack direction={"row"} spacing={2}>
            <ChipBar
              config={flowLayOutsConfig}
              callback={(layoutType) => handleLayoutChange(layoutType)}
            />
            <div className="graphLibraryTypesContainer">
              <RadioButtonGroup
                config={graphLibraryConfig}
                selectedValue={activeGraphLibrary}
                onChange={(library) => handleGraphLibraryChange(library)}
              />
            </div>
          </Stack>
          {activeGraphLibrary === graphLibraryTypes.MERMAID && (
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
                size="small"
              />
              <Button
                variant="contained"
                color="secondary"
                component="label"
                onClick={() => setOpenSummary(true)}
              >
                Summary
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component="label"
                onClick={() => setOpenEditFlow(true)}
              >
                Edit
              </Button>
            </Stack>
          )}
          <div className="flowsRenderContainer">
            {activeGraphLibrary === graphLibraryTypes.REACT_FLOWS &&
              flowData && (
                <ReactFlows nodes={flowData.nodes} edges={flowData.edges} />
              )}
            {activeGraphLibrary === graphLibraryTypes.MERMAID &&
              mermaidContent && (
                <MermaidFlows
                  reRenderFlows={reRenderFlows}
                  content={mermaidContent}
                />
              )}
            {activeGraphLibrary === graphLibraryTypes.CYTOSCAPE && flowData && (
              <CytoscapeFlows />
            )}
          </div>
        </div>
      )}
      {flowData && (
        <FlowSummary
          open={openSummary}
          summary={getFlowsSummary(flowData)}
          onCloseSummary={() => setOpenSummary(false)}
        />
      )}
      {flowData && (
        <EditFlow
          open={openEditFlow}
          flowData={flowData}
          onCloseEditFlow={() => setOpenEditFlow(false)}
          onEditFlow={(flowData) => handleEditFlow(flowData)}
        />
      )}
    </div>
  );
};

export default Flows;
