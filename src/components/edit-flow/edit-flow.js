import React from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from "@mui/material";

const EditFlow = ({ open, onCloseEditFlow, onEditFlow, nodes, edges }) => {
  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onCloseEditFlow}>
      <DialogTitle>
        <Typography variant="h6">Edit Flow</Typography>
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={onCloseEditFlow}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFlow;
