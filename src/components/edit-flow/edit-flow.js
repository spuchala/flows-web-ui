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

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onCloseEditFlow}>
      <DialogTitle>
        <Typography variant="h6">Edit Flow</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={handleChange}>
            <Tab value="people" label="People" />
            <Tab value="processes" label="Processes" />
          </Tabs>
          {activeTab === "people" && (
            <div>
              <CustomTable config={peopleTableConfig} data={nodes} />
            </div>
          )}
          {activeTab === "processes" && (
            <div>
              <CustomTable config={processesTableConfig} data={edges} />
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
