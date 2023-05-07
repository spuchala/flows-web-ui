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

const EditFlow = ({ open, onCloseEditFlow, onEditFlow, nodes, edges }) => {
  const [activeTab, setActiveTab] = useState("people");
  const [nodesState, setNodesState] = useState(nodes);
  const [edgesState, setEdgesState] = useState(edges);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditNode = (editedNode) => {
    let nodesStateClone = [...nodesState];
    let edgesStateClone = [...edgesState];

    const editedNodeIndex = nodes.findIndex(({ id }) => id === editedNode.id);
    const relatedEdgeIndexes = edges
      .map(({ sourceId, targetId }, index) =>
        sourceId === nodes[editedNodeIndex].id ||
        targetId === nodes[editedNodeIndex].id
          ? index
          : -1
      )
      .filter((index) => index !== -1);

    nodesStateClone[editedNodeIndex] = editedNode;
    nodesStateClone[editedNodeIndex].data.label = editedNode.name;

    relatedEdgeIndexes.forEach((relatedEdgeIndex) => {
      if (
        edgesStateClone[relatedEdgeIndex].sourceId ===
        nodesStateClone[editedNodeIndex].id
      ) {
        edgesStateClone[relatedEdgeIndex].source = editedNode.name;
      }
      if (
        edgesStateClone[relatedEdgeIndex].targetId ===
        nodesStateClone[editedNodeIndex].id
      ) {
        edgesStateClone[relatedEdgeIndex].target = editedNode.name;
      }
    });

    setNodesState(nodesStateClone);
    setEdgesState(edgesStateClone);
    onEditFlow(nodesStateClone, edgesStateClone);
  };

  const handleEditEdge = (editedEdge) => {
    const editedEdgeIndex = edges.findIndex(
      ({ sourceId, targetId }) =>
        sourceId === editedEdge.sourceId || targetId === sourceId.targetId
    );
    let edgesStateClone = [...edgesState];

    edgesStateClone[editedEdgeIndex] = editedEdge;
    setEdgesState(edgesStateClone);
    onEditFlow(nodesState, edgesStateClone);
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
                data={nodesState}
                onEditRow={(editedRow) => handleEditNode(editedRow)}
              />
            </div>
          )}
          {activeTab === "processes" && (
            <div>
              <CustomTable
                config={processesTableConfig}
                data={edgesState}
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
