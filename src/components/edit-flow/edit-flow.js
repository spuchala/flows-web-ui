import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Tabs,
  Tab
} from "@mui/material";
import CustomTable from "../custom-table/custom-table";
import peopleTableConfig from "../../config/people-table-config";
import processesTableConfig from "../../config/processes-table-config";

const EditFlow = ({ open, onCloseEditFlow, onEditFlow, flowData }) => {
  const [activeTab, setActiveTab] = useState("people");
  const [flowDataState, setFlowDataState] = useState(flowData);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditNode = (editedNode) => {
    let nodesClone = [...flowDataState.nodes];
    let edgesClone = [...flowDataState.edges];
    let groupsClone = [...flowDataState.groups];

    const editedNodeIndex = nodesClone.findIndex(
      ({ id }) => id === editedNode.id
    );
    const relatedEdgeIndexes = edgesClone
      .map(({ sourceId, targetId }, index) =>
        sourceId === nodesClone[editedNodeIndex].id ||
        targetId === nodesClone[editedNodeIndex].id
          ? index
          : -1
      )
      .filter((index) => index !== -1);

    nodesClone[editedNodeIndex] = editedNode;
    nodesClone[editedNodeIndex].data.label = editedNode.name;
    relatedEdgeIndexes.forEach((relatedEdgeIndex) => {
      if (
        edgesClone[relatedEdgeIndex].sourceId === nodesClone[editedNodeIndex].id
      ) {
        edgesClone[relatedEdgeIndex].source = editedNode.name;
      }
      if (
        edgesClone[relatedEdgeIndex].targetId === nodesClone[editedNodeIndex].id
      ) {
        edgesClone[relatedEdgeIndex].target = editedNode.name;
      }
    });

    setFlowDataState({
      nodes: nodesClone,
      edges: edgesClone,
      groups: groupsClone
    });
    onEditFlow(flowData);
  };

  const handleEditEdge = (editedEdge) => {
    const editedEdgeIndex = flowDataState.edges.findIndex(
      ({ sourceId, targetId }) =>
        sourceId === editedEdge.sourceId || targetId === sourceId.targetId
    );

    let edgesClone = [...flowDataState.edges];
    edgesClone[editedEdgeIndex] = editedEdge;

    setFlowDataState({ ...flowData, edges: edgesClone });
    onEditFlow(flowData);
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onCloseEditFlow}>
      <DialogTitle>
        <Typography>Edit Flow</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={handleChange}>
            <Tab value="people" label="People" />
            <Tab value="processes" label="Processes" />
          </Tabs>
          {activeTab === "people" && (
            <div>
              <CustomTable
                config={peopleTableConfig}
                data={flowDataState.nodes}
                onEditRow={(editedRow) => handleEditNode(editedRow)}
              />
            </div>
          )}
          {activeTab === "processes" && (
            <div>
              <CustomTable
                config={processesTableConfig}
                data={flowDataState.edges}
                onEditRow={(editedRow) => handleEditEdge(editedRow)}
              />
            </div>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseEditFlow}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFlow;
